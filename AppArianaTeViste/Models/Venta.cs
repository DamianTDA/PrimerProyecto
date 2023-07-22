namespace AppArianaTeViste.Models
{
    public class Venta
    {
        public int IdVenta { get; set; }
        public int IdProductoVendido { get; set; }
        public int CantidadVendida { get; set; }
        public decimal PrecioVenta { get; set; }
        public string FechaVenta { get; set; }

    }
}
