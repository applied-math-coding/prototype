
export class GraphqlService {
  readonly BASE_URL = '/graph-api/items';

  createRequest<T>(query: string, queryName: string, variables?: object): Promise<T> {
    return fetch(`${this.BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, ...(variables ? { variables } : {}) })
    }).then(r => r.json())
      .then(d => d.data[queryName]);
  }
}
