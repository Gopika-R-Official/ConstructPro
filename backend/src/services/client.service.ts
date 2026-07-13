import { clientRepository } from '../repositories/client.repository';
import { AppError } from '../utils/AppError';
import { Prisma } from '@prisma/client';

export class ClientService {
  async getAllClients() {
    return clientRepository.findAll();
  }

  async getClientById(id: string) {
    const client = await clientRepository.findById(id);
    if (!client) {
      throw new AppError('Client not found', 404);
    }
    return client;
  }

  async createClient(data: { name: string; company?: string; phone?: string; location?: string }) {
    if (!data.name || data.name.trim() === '') {
      throw new AppError('Name is required', 400);
    }
    return clientRepository.create(data);
  }

  async updateClient(id: string, data: Prisma.ClientUpdateInput) {
    // Verify client exists
    await this.getClientById(id);
    return clientRepository.update(id, data);
  }

  async deleteClient(id: string) {
    await this.getClientById(id);
    return clientRepository.softDelete(id);
  }
}

export const clientService = new ClientService();
