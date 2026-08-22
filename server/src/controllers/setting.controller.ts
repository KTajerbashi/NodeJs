import type { Request, Response } from "express";
import { SettingService } from "../services/setting.service.js";
import { SettingRepository } from "../repositories/setting.repository.js";
import { generateGuid } from "../extensions/stringExtensions.js";

const service = new SettingService(new SettingRepository());

export async function getAll(_req: Request, res: Response): Promise<void> {
  const data = await service.onGetAsync();
  res.status(200).json(data);
}

export async function getByKey(_req: Request, res: Response): Promise<void> {
  const key = _req.params.key as string;
  const model = await service.onGetByKeyAsync(key);
  if (!model) {
    res.status(404).json({
      message: "User not found.",
    });
    return;
  }
  res.status(200).json(model);
}
export async function create(_req: Request, res: Response): Promise<void> {
  console.log("[api] ", _req.body);
  _req.body["key"] = generateGuid();
  const user = await service.onCreateAsync(_req.body);
  res.status(201).json(user);
}
export async function update(_req: Request, res: Response): Promise<void> {
  const key = _req.params.key as string;
  const model = await service.onUpdateByKeyAsync(key, _req.body);
  if (!model) {
    res.status(404).json({
      message: "Record not found.",
    });
    return;
  }
  res.status(200).json(model);
}
export async function remove(_req: Request, res: Response): Promise<void> {
  const key = _req.params.key as string;
  const model = await service.onDeleteByKeyAsync(key);
  if (!model) {
    res.status(404).json({
      message: "Record not found.",
    });
    return;
  }
  res.status(204).send();
}
