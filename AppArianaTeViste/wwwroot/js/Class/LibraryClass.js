class Producto {
            constructor(producto) {
                this.IdProducto = producto.IdProducto;
                this.CodigoSecundario = producto.codSecundario;
                this.Descripcion = producto.Descripcion;
                this.Sexo = producto.sexo;
                this.Temporada = producto.temporada;
                this.Estilo = producto.estilo;
                this.FechaDeAlta = producto.FechaDeAlta;
                this.FechaActualizacion = producto.fechaActualizacion;
                this.Color = producto.Color;
                this.talle = producto.talle;
                this.proveedor = producto.proveedor;
                this.PrecioCompra = producto.precioCompra;
                this.PrecioVenta = producto.PrecioVenta;
                this.Cantidad = producto.cantidad;
                this.CantidadVendida = producto.cantidadVendida;
                
            }

}

export { Producto };