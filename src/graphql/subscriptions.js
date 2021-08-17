/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOccupation = /* GraphQL */ `
  subscription OnCreateOccupation {
    onCreateOccupation {
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
export const onUpdateOccupation = /* GraphQL */ `
  subscription OnUpdateOccupation {
    onUpdateOccupation {
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
export const onDeleteOccupation = /* GraphQL */ `
  subscription OnDeleteOccupation {
    onDeleteOccupation {
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
export const onCreateReservationReccurrente = /* GraphQL */ `
  subscription OnCreateReservationReccurrente {
    onCreateReservationReccurrente {
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
export const onUpdateReservationReccurrente = /* GraphQL */ `
  subscription OnUpdateReservationReccurrente {
    onUpdateReservationReccurrente {
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
export const onDeleteReservationReccurrente = /* GraphQL */ `
  subscription OnDeleteReservationReccurrente {
    onDeleteReservationReccurrente {
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
export const onCreateException = /* GraphQL */ `
  subscription OnCreateException {
    onCreateException {
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
export const onUpdateException = /* GraphQL */ `
  subscription OnUpdateException {
    onUpdateException {
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
export const onDeleteException = /* GraphQL */ `
  subscription OnDeleteException {
    onDeleteException {
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
