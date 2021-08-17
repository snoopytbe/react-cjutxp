/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncOccupations = /* GraphQL */ `
  query SyncOccupations(
    $filter: ModeloccupationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOccupations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        loge
        acronyme
        recurrent {
          nextToken
          startedAt
        }
        exceptionnel {
          nextToken
          startedAt
        }
        suppression {
          nextToken
          startedAt
        }
        modify_reccurent {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getOccupation = /* GraphQL */ `
  query GetOccupation($id: ID!) {
    getOccupation(id: $id) {
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
export const listOccupations = /* GraphQL */ `
  query ListOccupations(
    $filter: ModeloccupationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOccupations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        loge
        acronyme
        recurrent {
          nextToken
          startedAt
        }
        exceptionnel {
          nextToken
          startedAt
        }
        suppression {
          nextToken
          startedAt
        }
        modify_reccurent {
          nextToken
          startedAt
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncReservationReccurrentes = /* GraphQL */ `
  query SyncReservationReccurrentes(
    $filter: ModelReservationReccurrenteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReservationReccurrentes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getReservationReccurrente = /* GraphQL */ `
  query GetReservationReccurrente($id: ID!) {
    getReservationReccurrente(id: $id) {
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
export const listReservationReccurrentes = /* GraphQL */ `
  query ListReservationReccurrentes(
    $filter: ModelReservationReccurrenteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservationReccurrentes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const syncExceptions = /* GraphQL */ `
  query SyncExceptions(
    $filter: ModelExceptionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncExceptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getException = /* GraphQL */ `
  query GetException($id: ID!) {
    getException(id: $id) {
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
export const listExceptions = /* GraphQL */ `
  query ListExceptions(
    $filter: ModelExceptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listExceptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
