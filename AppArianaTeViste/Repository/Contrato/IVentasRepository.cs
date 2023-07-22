namespace AppArianaTeViste.Repository.Contrato
{
    public interface IVentas<Venta> where Venta : class
    {
        Task<int?> Editar(Venta[] modelo);
    }
}
