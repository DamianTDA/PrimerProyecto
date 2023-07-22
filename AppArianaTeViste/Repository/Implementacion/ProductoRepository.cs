using AppArianaTeViste.Repository.Contrato;
using AppArianaTeViste.Models;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;

namespace AppArianaTeViste.Repository.Implementacion
{
    public class ProductoRepository : IGenericRepository<Producto>
    {

        private readonly string _cadenaSQL = "";

        public ProductoRepository(IConfiguration configuracion)
        {
            _cadenaSQL = configuracion.GetConnectionString("cadenaSQL");
        }
        

        public Task<bool> Create(Producto modelo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Edit(Producto modelo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Editar(Producto modelos)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Editar(Producto[] modelo)
        {
            throw new NotImplementedException();
        }

        public async Task<Producto> GetIdentifier(int id)
        {
            Producto? producto = null;
            using (var conexion = new SqlConnection(_cadenaSQL))
            {
                        await conexion.OpenAsync();
                        SqlCommand cmd = new SqlCommand("ConsPorIdProducto", conexion);
                        cmd.Parameters.AddWithValue("@IdProducto", id);
                        cmd.CommandType = CommandType.StoredProcedure;
                        using (var dr = await cmd.ExecuteReaderAsync())
                        {
                            
                            if (await dr.ReadAsync())
                            {
                                producto = new Producto();
                                producto.IdProducto = Convert.ToInt32(dr["IdProducto"]);
                                producto.CodSecundario = Convert.ToString(dr["CodSecundario"]);
                                producto.Descripcion = Convert.ToString(dr["Descripcion"]);
                                producto.Sexo = Convert.ToString(dr["Sexo"]);
                                producto.Temporada = Convert.ToString(dr["Temporada"]);
                                producto.Estilo = new Estilo();
                                producto.Estilo.Id = Convert.ToInt32(dr["Id"]);
                                producto.FechaDeAlta = Convert.ToString(dr["AnoDeIngreso"]);
                                producto.Color = new Models.Color();
                                producto.Color.IdColor = Convert.ToInt32((dr["IdColor"]));
                                producto.Color.Descripcion = Convert.ToString((dr["DescripcionColor"]));
                                producto.talle = new Talle();
                                producto.talle.idTalle = Convert.ToInt32(dr["IdTalle"]);
                                producto.talle.Descripcion = Convert.ToString(dr["DescripcionTalle"]);
                                producto.proveedor = new Proveedor();
                                producto.proveedor.IdProveedor = Convert.ToInt32(dr["Idproveedor"]);
                                producto.proveedor.RazonSocial = Convert.ToString(dr["RazonSocial"]);
                                producto.PrecioCompra = Convert.ToDecimal(dr["PrecioCompra"]);
                                producto.PrecioVenta = Convert.ToDecimal(dr["PrecioVenta"]);
                                producto.Cantidad = Convert.ToInt32(dr["Cantidad"]);
                            }
                        }
                    
                    return producto;
            }
            
        }

        public Task<List<Producto>> Lista()
        {
            throw new NotImplementedException();
        }


        public async Task<List<Producto>> ListaString(string descripcion)
        {
            List<Producto> _lista = new List<Producto>();
            using (var conexion = new SqlConnection(_cadenaSQL))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("ListadoProductos", conexion);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@Descripcion", descripcion));
                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    while (await dr.ReadAsync())
                    {
                        Producto producto = new Producto();
                        producto.IdProducto = Convert.ToInt32(dr["IdProducto"]);
                        producto.CodSecundario = Convert.ToString(dr["CodSecundario"]);
                        producto.Descripcion = Convert.ToString(dr["Descripcion"]);
                        producto.Sexo = Convert.ToString(dr["Sexo"]);
                        producto.Temporada = Convert.ToString(dr["Temporada"]);
                        producto.Estilo = new Estilo();
                        producto.Estilo.Id = Convert.ToInt32(dr["Id"]);
                        producto.Estilo.Descripcion = Convert.ToString(dr["Detalle"]);
                        producto.FechaDeAlta = Convert.ToString(dr["AnoDeIngreso"]);
                        producto.Color = new Models.Color();
                        producto.Color.IdColor = Convert.ToInt32((dr["IdColor"]));
                        producto.Color.Descripcion = Convert.ToString(dr["DescripcionColor"]);
                        producto.talle = new Talle();
                        producto.talle.idTalle = Convert.ToInt32(dr["IdTalle"]);
                        producto.talle.Descripcion = Convert.ToString(dr["DescripcionTalle"]);
                        producto.proveedor = new Proveedor();
                        producto.proveedor.IdProveedor = Convert.ToInt32(dr["IdProveedor"]);
                        producto.proveedor.RazonSocial = Convert.ToString(dr["RazonSocial"]);
                        producto.FechaActualizacion = Convert.ToDateTime(dr["FechaActualizacion"]);
                        producto.PrecioCompra = Convert.ToDecimal(dr["PrecioCompra"]);
                        producto.PrecioVenta = Convert.ToDecimal(dr["PrecioVenta"]);
                        producto.Cantidad = Convert.ToInt32(dr["Cantidad"]);
                        _lista.Add(producto);
                    }

                    return _lista;
                }
            }
                
        }

        
    }
                
}
