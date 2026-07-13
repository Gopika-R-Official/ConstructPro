import { materialRepository } from '../repositories/material.repository';
import { projectRepository } from '../repositories/project.repository';
import { AppError } from '../utils/AppError';

export class MaterialService {
  async getProjectMaterials(projectId: string) {
    const materials = await materialRepository.findByProjectId(projectId);

    const result = materials.map(mat => {
      const totalCost = mat.quantity * mat.unitPrice;
      const paidAmount = mat.payments.reduce((sum, payment) => sum + payment.amount, 0);
      const pending = totalCost - paidAmount;
      return { ...mat, totalCost, paidAmount, pending };
    });

    const categoriesMap = new Map<string, { type: string, totalQuantity: number, unit: string }>();
    result.forEach(mat => {
      if (!categoriesMap.has(mat.type)) {
        categoriesMap.set(mat.type, { type: mat.type, totalQuantity: 0, unit: mat.unit });
      }
      categoriesMap.get(mat.type)!.totalQuantity += mat.quantity;
    });

    return { materials: result, categories: Array.from(categoriesMap.values()) };
  }

  async createMaterial(projectId: string, data: any) {
    const project = await projectRepository.findById(projectId);
    if (!project) throw new AppError('Project not found', 404);

    return materialRepository.create({
      projectId,
      type: data.type,
      quantity: Number(data.quantity),
      unit: data.unit,
      unitPrice: Number(data.unitPrice),
      purchasedDate: data.purchasedDate ? new Date(data.purchasedDate) : new Date(),
    });
  }

  async deleteMaterial(id: string) {
    const material = await materialRepository.findById(id);
    if (!material) throw new AppError('Material not found', 404);
    return materialRepository.softDelete(id);
  }

  async createMaterialPayment(materialId: string, data: any) {
    const material = await materialRepository.findById(materialId);
    if (!material) throw new AppError('Material not found', 404);

    return materialRepository.createPayment({
      materialId,
      amount: Number(data.amount),
      method: data.method,
      date: data.date ? new Date(data.date) : new Date(),
    });
  }

  async deleteMaterialPayment(paymentId: string) {
    return materialRepository.deletePayment(paymentId);
  }
}

export const materialService = new MaterialService();
