import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type occupationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReservationReccurrenteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ExceptionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class occupation {
  readonly id: string;
  readonly loge: string;
  readonly acronyme: string;
  readonly recurrent?: (ReservationReccurrente | null)[];
  readonly exceptionnel?: (Exception | null)[];
  readonly suppression?: (Exception | null)[];
  readonly modify_reccurent?: (Exception | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<occupation, occupationMetaData>);
  static copyOf(source: occupation, mutator: (draft: MutableModel<occupation, occupationMetaData>) => MutableModel<occupation, occupationMetaData> | void): occupation;
}

export declare class ReservationReccurrente {
  readonly id: string;
  readonly occupationID: string;
  readonly semaine: string;
  readonly jour: string;
  readonly temple: string;
  readonly sallehumide: string;
  readonly heure: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ReservationReccurrente, ReservationReccurrenteMetaData>);
  static copyOf(source: ReservationReccurrente, mutator: (draft: MutableModel<ReservationReccurrente, ReservationReccurrenteMetaData>) => MutableModel<ReservationReccurrente, ReservationReccurrenteMetaData> | void): ReservationReccurrente;
}

export declare class Exception {
  readonly id: string;
  readonly occupationID: string;
  readonly date: string;
  readonly temple: string;
  readonly sallehumide: string;
  readonly heure: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Exception, ExceptionMetaData>);
  static copyOf(source: Exception, mutator: (draft: MutableModel<Exception, ExceptionMetaData>) => MutableModel<Exception, ExceptionMetaData> | void): Exception;
}