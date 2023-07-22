
using AppArianaTeViste.Repository.Contrato;
using AppArianaTeViste.Models;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Text.RegularExpressions;

namespace AppArianaTeViste.Repository.Implementacion
{
    public class VentaRepository : IVentas<Venta>
    {
        private readonly string _cadenaSQL = "";

        public VentaRepository(IConfiguration configuracion)
        {
            _cadenaSQL = configuracion.GetConnectionString("cadenaSQL");
        }





        public async Task<int?> Editar(Venta[] modelo)
        {
            try
            {
                using (var conexion = new SqlConnection(_cadenaSQL))
                {
                    await conexion.OpenAsync();
                    
                    // Crear DataTable para representar la tabla tipo tabla de valores
                    DataTable tablaVentas = new DataTable();
                    tablaVentas.Columns.Add("IdVentaP", typeof(int));
                    tablaVentas.Columns.Add("IdProductoP", typeof(int));
                    tablaVentas.Columns.Add("PVentaP", typeof(decimal));
                    tablaVentas.Columns.Add("CVendidaP", typeof(int));
                    tablaVentas.Columns.Add("FechaVentaP", typeof(string));

                    foreach (Venta venta in modelo)
                    {
                        Console.WriteLine($"idVenta: {venta.IdVenta},  IdProductoVendido: {venta.IdProductoVendido}, PrecioVenta: {venta.PrecioVenta}, CantidadVendida: {venta.CantidadVendida}, FechaVenta: {venta.FechaVenta}");
                        tablaVentas.Rows.Add(venta.IdVenta, venta.IdProductoVendido, venta.PrecioVenta, venta.CantidadVendida,venta.FechaVenta);
                    }
                    Console.WriteLine($"Filas agregadas a tablaVentas: {tablaVentas.Rows.Count}");
                    SqlCommand cmd = new SqlCommand("SP_VentasProductos", conexion);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TablaVentas", tablaVentas); // Pasar la tabla tipo tabla de valores como parámetro

                    await cmd.ExecuteNonQueryAsync();

                    int filasAfectadas = modelo.Length;
                    return filasAfectadas > 0 ? 0 : (int?)null;

                }
            }
            catch (Exception ex)
            {
                // Manejo de excepciones

                Console.WriteLine(ex.Message); // Imprime el mensaje de la excepción en la consola.

                // Extraer el ID del producto que causó la excepción (sin verificar si es una violación de clave externa)
                var match = Regex.Match(ex.Message, @"\d+");
                // Utiliza una expresión regular para buscar uno o más dígitos (\d+) en el mensaje de la excepción.
                // Esta expresión regular buscará cualquier secuencia de números en el mensaje.

                if (match.Success && match.Groups.Count > 0)
                {
                    // Si se encuentra una coincidencia y se puede extraer el número correctamente,
                    // se convertirá a un valor entero y se asignará a la variable idProducto.

                    if (int.TryParse(match.Groups[0].Value, out int idProducto))
                    {
                        // int.TryParse() intenta convertir el valor capturado por la expresión regular (match.Groups[0].Value) en un número entero.
                        // Si la conversión es exitosa, el valor se asigna a la variable idProducto.

                        return idProducto; // Retorna el idProducto extraído.
                    }
                }

                // Si no se puede extraer el ID del producto o no se encuentra ningún número en el mensaje de la excepción, se retorna null.
                return null;
            }


        }


    }

}



    
