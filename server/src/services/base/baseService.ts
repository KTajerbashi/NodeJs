import { BaseRepository } from "../../repositories/base/baseRepository.js";

export abstract class BaseService<TDto, TView, TEntity> {
  constructor(
    protected readonly repository: BaseRepository<TEntity>,
  ) {}

  public async onCreateAsync(
    data: TDto,
  ): Promise<TView> {
    const entity = this.toEntity(data);

    const result = await this.repository.add(entity);

    return this.toView(result);
  }

  public async onUpdateByIdAsync(
    id: string,
    data: TDto,
  ): Promise<TView | null> {
    const entity = this.toEntity(data);

    const result = await this.repository.updateById(
      id,
      entity,
    );

    return result
      ? this.toView(result)
      : null;
  }

  public async onUpdateByKeyAsync(
    key: string,
    data: TDto,
  ): Promise<TView | null> {
    const entity = this.toEntity(data);

    const result = await this.repository.updateByKey(
      key,
      entity,
    );

    return result
      ? this.toView(result)
      : null;
  }

  public async onDeleteByIdAsync(
    id: string,
  ): Promise<TView | null> {
    const result = await this.repository.deleteById(id);

    return result
      ? this.toView(result)
      : null;
  }

  public async onDeleteByKeyAsync(
    key: string,
  ): Promise<TView | null> {
    const result = await this.repository.deleteByKey(key);

    return result
      ? this.toView(result)
      : null;
  }

  public async onGetAsync(): Promise<TView[]> {
    const result = await this.repository.getAll();

    return result.map((entity) => this.toView(entity));
  }

  public async onGetByIdAsync(
    id: string,
  ): Promise<TView | null> {
    const result = await this.repository.getById(id);

    return result
      ? this.toView(result)
      : null;
  }

  public async onGetByKeyAsync(
    key: string,
  ): Promise<TView | null> {
    const result = await this.repository.getByKey(key);

    return result
      ? this.toView(result)
      : null;
  }

  protected abstract toEntity(
    data: TDto,
  ): Partial<TEntity>;

  protected abstract toView(
    entity: TEntity,
  ): TView;
}