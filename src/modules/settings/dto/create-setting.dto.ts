import { Setting } from "../entities/setting.entity";

export class CreateSettingDto implements Setting {
    id?: number;
    endAt?: Date;
    currentToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
