using System;

namespace AppArianaTeViste.Models
{
    public class Producto
    {
        public int IdProducto { get; set; }
        public string CodSecundario { get; set; }
        public string Descripcion { get; set; }
        public string Sexo { get; set; }
        public string Temporada { get; set; }
        public Estilo Estilo { get; set; }
        public string FechaDeAlta { get; set; }
        public DateTime FechaActualizacion { get; set; }
        public Color Color { get; set; }
        public Talle talle { get; set; }
        public Proveedor proveedor { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal PrecioVenta { get; set; }
        public int Cantidad { get; set; }

        
    }
}
