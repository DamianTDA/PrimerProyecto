using AppArianaTeViste.Models;
using AppArianaTeViste.Repository.Implementacion;

namespace AppArianaTeViste.Repository.Contrato
{
    public interface IGenericRepository<T>where T : class
    {
        Task<List<T>> Lista();
        Task<List<T>> ListaString(string descripcion);
        Task<T> GetIdentifier(int id);
        Task<bool> Create(T modelo);
        Task<bool> Edit(T modelo);
        Task<bool> Delete(int id);
        Task<bool> Editar(T modelos);
        
    }
}
