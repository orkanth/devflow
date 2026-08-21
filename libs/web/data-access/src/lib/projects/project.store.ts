import { computed, inject, Injectable, signal } from '@angular/core';
import {
  CreateProjectDto,
  Project,
  UpdateProjectDto,
} from '@devflow/shared-types';
import { firstValueFrom } from 'rxjs';
import { ProjectDataService } from './project-data.service';
import { RolePermissionsService } from '../auth/role-permissions.service';

interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
  searchQuery: '',
};

@Injectable({ providedIn: 'root' })
export class ProjectStore {
  private readonly projectService = inject(ProjectDataService);
  private readonly permissions = inject(RolePermissionsService);
  private readonly state = signal<ProjectState>(initialState);

  readonly projects = computed(() => this.state().projects);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);
  readonly searchQuery = computed(() => this.state().searchQuery);

  readonly filteredProjects = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const list = this.projects();
    if (!query) {
      return list;
    }
    return list.filter(
      (project) =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query),
    );
  });

  readonly activeCount = computed(
    () => this.projects().filter((p) => p.status === 'active').length,
  );

  readonly archivedCount = computed(
    () => this.projects().filter((p) => p.status === 'archived').length,
  );

  setSearchQuery(query: string): void {
    this.patch({ searchQuery: query });
  }

  async loadProjects(): Promise<void> {
    this.patch({ loading: true, error: null });
    try {
      const projects = await firstValueFrom(this.projectService.getAll());
      this.patch({ projects, loading: false });
    } catch {
      this.patch({
        loading: false,
        error: 'Failed to load projects. Please try again.',
      });
    }
  }

  async createProject(data: CreateProjectDto): Promise<boolean> {
    if (!this.permissions.canManageProjects()) {
      this.patch({ error: 'Only admins can create projects.' });
      return false;
    }

    this.patch({ loading: true, error: null });
    try {
      const project = await firstValueFrom(this.projectService.create(data));
      this.patch({
        projects: [project, ...this.projects()],
        loading: false,
      });
      return true;
    } catch {
      this.patch({
        loading: false,
        error: 'Failed to create project.',
      });
      return false;
    }
  }

  async updateProject(id: string, data: UpdateProjectDto): Promise<boolean> {
    if (!this.permissions.canManageProjects()) {
      this.patch({ error: 'Only admins can edit projects.' });
      return false;
    }

    this.patch({ loading: true, error: null });
    try {
      const updated = await firstValueFrom(
        this.projectService.update(id, data),
      );
      this.patch({
        projects: this.projects().map((p) => (p.id === id ? updated : p)),
        loading: false,
      });
      return true;
    } catch {
      this.patch({
        loading: false,
        error: 'Failed to update project.',
      });
      return false;
    }
  }

  async deleteProject(id: string): Promise<boolean> {
    if (!this.permissions.canManageProjects()) {
      this.patch({ error: 'Only admins can delete projects.' });
      return false;
    }

    this.patch({ loading: true, error: null });
    try {
      await firstValueFrom(this.projectService.delete(id));
      this.patch({
        projects: this.projects().filter((p) => p.id !== id),
        loading: false,
      });
      return true;
    } catch {
      this.patch({
        loading: false,
        error: 'Failed to delete project.',
      });
      return false;
    }
  }

  clearError(): void {
    this.patch({ error: null });
  }

  private patch(partial: Partial<ProjectState>): void {
    this.state.update((current) => ({ ...current, ...partial }));
  }
}
