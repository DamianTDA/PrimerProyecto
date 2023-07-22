using AppArianaTeViste.Models;
using AppArianaTeViste.Repository.Contrato;
using System.Data;
using System.Data.SqlClient;




namespace AppArianaTeViste.Repository.Implementacion
{

    public class ColorRepository : IGenericRepository<Color>
    {
        private readonly string _cadenaSQL = "";

        
        public ColorRepository(IConfiguration configuracion)
        {
            _cadenaSQL = configuracion.GetConnectionString("cadenaSQL");
        }

        public async Task<List<Color>> Lista()
        {
            List<Color> _lista = new List<Color>();
            try
            {
                using (var conexion = new SqlConnection(_cadenaSQL))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("SP_ConsultaColores", conexion)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    using var dr = await cmd.ExecuteReaderAsync();
                    while (await dr.ReadAsync())
                    {
                        _lista.Add(new Color
                        {
                            IdColor = Convert.ToInt32(dr["idColor"]),
                            Descripcion = dr["DescripcionColor"].ToString()
                        });
                    }
                }
                return _lista;

            }
            catch (Exception)
            {

                throw;
            }
            
        }


        public async Task<bool> Create(Color modelo)
        {
            try
            {
                using (var conexion = new SqlConnection(_cadenaSQL))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("CrearColores", conexion);
                    cmd.Parameters.AddWithValue("@DescripcionColor", modelo.Descripcion);
                    cmd.CommandType = CommandType.StoredProcedure;

                    int fila_afectadas = await cmd.ExecuteNonQueryAsync();
                    if (fila_afectadas > 0)
                        return true;
                    else
                        return false;

                }
            }
           
            catch (Exception ex)
            {
                throw;
            }
        }

        

        public async Task<bool> Edit(Color modelo)
        {
            using (var conexion = new SqlConnection(_cadenaSQL))
            {
                conexion.Open();
                SqlCommand cmd = new SqlCommand("UpdateColores", conexion);
                cmd.Parameters.AddWithValue("@IdColor", modelo.IdColor);
                cmd.Parameters.AddWithValue("@DescripcionColor", modelo.Descripcion);
                cmd.CommandType = CommandType.StoredProcedure;
                int fila_afectadas = await cmd.ExecuteNonQueryAsync();
                if (fila_afectadas > 0)
                    return true;
                else
                    return false;

            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                using (var conexion = new SqlConnection(_cadenaSQL))
                {
                    conexion.Open();
                    SqlCommand cmd = new SqlCommand("EliminarColores", conexion);
                    cmd.Parameters.AddWithValue("@IdColor", id);

                    cmd.CommandType = CommandType.StoredProcedure;
                    int filas_afectadas = await cmd.ExecuteNonQueryAsync();
                    if (filas_afectadas < 0)
                        return false;
                    else return true;
                }
            }
                catch (Exception)
            {
                return false;
            }
        }

        
        public async Task<Color> GetIdentifier(int IdColor)
        {
            Color color = null;

            using (var conexion = new SqlConnection(_cadenaSQL))
            {
                await conexion.OpenAsync();
                SqlCommand cmd = new SqlCommand("ConsColorPorId", conexion);
                cmd.Parameters.AddWithValue("@IdColor", IdColor);
                cmd.CommandType = CommandType.StoredProcedure;

                using (var dr = await cmd.ExecuteReaderAsync())
                {
                    if (await dr.ReadAsync())
                    {
                        color = new Color();
                        color.IdColor = Convert.ToInt32(dr["idColor"]);
                        color.Descripcion = dr["DescripcionColor"].ToString();
                    }
                }
            }
            return color;
        }

       
        

        public Task<List<Color>> ListaString(string descripcion)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Editar(Color modelos)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Editar(Color [] modelo)
        {
            throw new NotImplementedException();
        }
    }

}
