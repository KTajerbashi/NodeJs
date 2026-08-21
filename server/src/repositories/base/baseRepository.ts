import { Model, UpdateQuery } from "mongoose";
import { generateGuid } from "../../extensions/stringExtensions.js";

export type RepositoryFilter<T> = Partial<T>;

export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async add(data: Partial<T>): Promise<T> {
    console.log("[add] ", data);
    return this.model.create(data);
  }

  async updateByKey(key: string, data: UpdateQuery<T>): Promise<T | null> {
    console.log("[updateByKey] ", key, data);
    return this.model.findOneAndUpdate({ key: key }, data, {
      new: true,
      runValidators: true,
    });
  }

  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    console.log("[updateById] ", id, data);
    return this.model.findByIdAndUpdate({ id }, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteByKey(key: string): Promise<T | null> {
    console.log("[deleteByKey] ", key);
    return this.model.findOneAndDelete({ key: key });
  }

  async deleteById(id: string): Promise<T | null> {
    console.log("[deleteById] ", id);
    return this.model.findByIdAndDelete({ id });
  }

  async getById(id: string): Promise<T | null> {
    console.log("[getById] ", id);
    return this.model.findById(id);
  }

  async getByKey(key: string): Promise<T | null> {
    console.log("[getByKey] ", key);
    return this.model.findOne({ key: key });
  }

  async getAll(): Promise<T[]> {
    console.log("[getAll]");
    return this.model.find();
  }

  async find(filter: RepositoryFilter<T>): Promise<T[]> {
    console.log("[find] ", filter);
    return this.model.find(filter);
  }
}
