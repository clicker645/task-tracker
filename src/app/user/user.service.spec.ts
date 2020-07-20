import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepository } from './repositories/user-repository.interface';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginationOptions } from '../../infrastructure/databases/mongoose/pagination/paginate.params';
import { IPaginate } from '../../infrastructure/databases/mongoose/pagination/pagination.output';
import { User } from './user.entity';

const provideUserRepository = 'userRepository';
const testEmail = 'some@some.com';

const mockUsers = [
  {
    _id: 'some id',
    email: 'test@test.com',
    status: 'active',
    login: 'some',
    gender: 'male',
    role: 'admin',
    password: 'some_password',
  },
];

const queryParams = {
  login: 'testUser',
  email: 'test@test.com',
} as QueryUserDto;

const pagination = { page: 2, limit: 10 } as PaginationOptions;

const mockPaginateResponse = {
  docs: mockUsers,
  page: 1,
  limit: 10,
} as IPaginate<User>;

const mockUserRepository = () => ({
  findAll: jest.fn(),
  findByEmail: jest.fn(),
  findById: jest.fn(),
});

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useFactory: repo => {
            return new UserService(repo, null);
          },
          inject: [provideUserRepository],
        },
        {
          provide: provideUserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userService = await module.get(UserService);
    userRepository = await module.get(provideUserRepository);
  });

  describe('findAll', () => {
    it('should all users from repository', async () => {
      jest
        .spyOn(userRepository, 'findAll')
        .mockResolvedValue(mockPaginateResponse);

      expect(userRepository.findAll).not.toHaveBeenCalled();

      const response = await userService.findAll(queryParams, pagination);

      expect(userRepository.findAll).toHaveBeenCalledWith(
        queryParams,
        pagination,
      );

      expect(response).toEqual(mockPaginateResponse);
    });
  });

  describe('findByEmail', () => {
    it('should be one user', async () => {
      jest
        .spyOn(userRepository, 'findByEmail')
        .mockResolvedValue(mockUsers[0] as User);
      expect(userRepository.findByEmail).not.toHaveBeenCalled();

      const response = await userService.findByEmail(testEmail);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(testEmail);
      expect(response).toEqual(mockUsers[0] as User);
    });

    it('should be throw an error as user is not found', () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

      return expect(userService.findByEmail(testEmail)).rejects.toThrow();
    });
  });

  describe('findById', () => {
    it('should be one user', async () => {
      jest
        .spyOn(userRepository, 'findById')
        .mockResolvedValue(mockUsers[0] as User);
      expect(userRepository.findById).not.toHaveBeenCalled();

      const response = await userService.findById(testEmail);

      expect(userRepository.findById).toHaveBeenCalledWith(testEmail);
      expect(response).toEqual(mockUsers[0] as User);
    });

    it('should be throw an error as user is not found', () => {
      jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

      return expect(userService.findById(testEmail)).rejects.toThrow();
    });
  });
});
