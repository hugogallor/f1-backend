export interface CRUD{
    list: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putById: (id: string, resource: any) => Promise<string | null>;
    readById: (id: string) => Promise<any>;
    deleteById: (id: string) => Promise<any>;
    patchById: (id:string, resource: any) => Promise<string | null>;
}