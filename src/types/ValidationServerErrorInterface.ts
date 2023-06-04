import type { FieldErrorInterface } from "./FieldErrorInterface";
import type { ServerErrorInterface } from "./ServerErrorInterface";

export interface ValidationServerErrorInterface extends ServerErrorInterface {
    errors: Array<FieldErrorInterface>
}