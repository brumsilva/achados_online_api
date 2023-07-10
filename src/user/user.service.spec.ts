import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

const mockUserModel = {
  findOne: jest.fn().mockResolvedValue(null),
  exec: jest.fn(),
  create: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken('user'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };

      const createdUser = new User();
      createdUser.email = createUserDto.email;
      createdUser.password = createUserDto.password;
      createdUser.name = createUserDto.name;

      jest.spyOn(service, 'create').mockResolvedValue(createdUser as any);

      const result = await controller.create(createUserDto);

      expect(service.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });

    it('should throw ConflictException when user already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new ConflictException(
            'O usuario já existe. Tente criar utilizando um novo e-mail.',
          ),
        );

      await expect(controller.create(createUserDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email successfully', async () => {
      const email = 'test@example.com';
      const user = new User();
      user.email = email;

      jest.spyOn(service, 'findByEmail').mockResolvedValue(user);

      const result = await controller.findByEmail(email);

      expect(service.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'test@example.com';

      jest
        .spyOn(service, 'findByEmail')
        .mockRejectedValue(new NotFoundException(`User ${email} not found`));

      await expect(controller.findByEmail(email)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('user'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };

      const existingUser = null;

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingUser),
      });

      const createdUser = new User();
      createdUser.email = createUserDto.email;
      createdUser.password = createUserDto.password;
      createdUser.name = createUserDto.name;

      jest.spyOn(mockUserModel, 'create').mockResolvedValue(createdUser as any);

      const result = await service.create(createUserDto);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        email: createUserDto.email,
      });
      expect(mockUserModel.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: expect.any(String),
      });
      expect(result).toEqual(createdUser);
    });

    it('should throw ConflictException when user already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        name: 'John Doe',
      };

      const existingUser = new User();

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(existingUser),
      });

      await expect(service.create(createUserDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email successfully', async () => {
      const email = 'test@example.com';
      const user = new User();
      user.email = email;

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      const result = await service.findByEmail(email);

      expect(mockUserModel.findOne).toHaveBeenCalledWith({ email });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException when user is not found', async () => {
      const email = 'test@example.com';

      jest.spyOn(mockUserModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findByEmail(email)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
