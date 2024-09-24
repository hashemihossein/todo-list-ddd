import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoListDto } from './create-todo-list.dto';
import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'AtLeastOneField', async: false })
class UpdateTodoItemDtoValidator implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments): boolean {
    const excludeFields = ['userId'];

    return (
      Object.keys(value).filter((key) => !excludeFields.includes(key)).length >
      0
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'At least one field must be provided';
  }
}
export class UpdateTodoListDto extends PartialType(CreateTodoListDto) {
  @Validate(UpdateTodoItemDtoValidator)
  atLeastOneField: boolean;
}
