/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOccupation = /* GraphQL */ `
  mutation CreateOccupation(
    $input: CreateOccupationInput!
    $condition: ModeloccupationConditionInput
  ) {
    createOccupation(input: $input, condition: $condition) {
      id
      loge
      acronyme
      recurrent {
        items {
          id
          occupationID
          semaine
          jour
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      exceptionnel {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      suppression {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      modify_reccurent {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateOccupation = /* GraphQL */ `
  mutation UpdateOccupation(
    $input: UpdateOccupationInput!
    $condition: ModeloccupationConditionInput
  ) {
    updateOccupation(input: $input, condition: $condition) {
      id
      loge
      acronyme
      recurrent {
        items {
          id
          occupationID
          semaine
          jour
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      exceptionnel {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      suppression {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      modify_reccurent {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteOccupation = /* GraphQL */ `
  mutation DeleteOccupation(
    $input: DeleteOccupationInput!
    $condition: ModeloccupationConditionInput
  ) {
    deleteOccupation(input: $input, condition: $condition) {
      id
      loge
      acronyme
      recurrent {
        items {
          id
          occupationID
          semaine
          jour
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      exceptionnel {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      suppression {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      modify_reccurent {
        items {
          id
          occupationID
          date
          temple
          sallehumide
          heure
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createReservationReccurrente = /* GraphQL */ `
  mutation CreateReservationReccurrente(
    $input: CreateReservationReccurrenteInput!
    $condition: ModelReservationReccurrenteConditionInput
  ) {
    createReservationReccurrente(input: $input, condition: $condition) {
      id
      occupationID
      semaine
      jour
      temple
      sallehumide
      heure
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateReservationReccurrente = /* GraphQL */ `
  mutation UpdateReservationReccurrente(
    $input: UpdateReservationReccurrenteInput!
    $condition: ModelReservationReccurrenteConditionInput
  ) {
    updateReservationReccurrente(input: $input, condition: $condition) {
      id
      occupationID
      semaine
      jour
      temple
      sallehumide
      heure
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteReservationReccurrente = /* GraphQL */ `
  mutation DeleteReservationReccurrente(
    $input: DeleteReservationReccurrenteInput!
    $condition: ModelReservationReccurrenteConditionInput
  ) {
    deleteReservationReccurrente(input: $input, condition: $condition) {
      id
      occupationID
      semaine
      jour
      temple
      sallehumide
      heure
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createException = /* GraphQL */ `
  mutation CreateException(
    $input: CreateExceptionInput!
    $condition: ModelExceptionConditionInput
  ) {
    createException(input: $input, condition: $condition) {
      id
      occupationID
      date
      temple
      sallehumide
      heure
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateException = /* GraphQL */ `
  mutation UpdateException(
    $input: UpdateExceptionInput!
    $condition: ModelExceptionConditionInput
  ) {
    updateException(input: $input, condition: $condition) {
      id
      occupationID
      date
      temple
      sallehumide
      heure
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteException = /* GraphQL */ `
  mutation DeleteException(
    $input: DeleteExceptionInput!
    $condition: ModelExceptionConditionInput
  ) {
    deleteException(input: $input, condition: $condition) {
      id
      occupationID
      date
      temple
      sallehumide
      heure
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
