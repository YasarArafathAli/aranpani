import { FC, ReactElement, ComponentClass } from "react";

export interface RouterProps {
    path: string,
    component: FC | ReactElement  | ComponentClass
}

