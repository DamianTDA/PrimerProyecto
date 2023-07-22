using AppArianaTeViste.Models;
using AppArianaTeViste.Repository.Contrato;
using AppArianaTeViste.Repository.Implementacion;
using Microsoft.AspNetCore.Mvc;

namespace AppArianaTeViste.Controllers
{
    public class VentasController : Controller
    {
        private readonly ILogger<VentasController> _logger;
        private readonly IVentas<Venta> _ventasRepository;



        public VentasController(ILogger<VentasController> logger,
            IVentas<Venta> ventaRepository)
        {
            _logger = logger;
            _ventasRepository = ventaRepository;
        }

        [HttpPost]
        public async Task<IActionResult> EditarVentas([FromBody] Venta[] modelos)
        {
            int _resultado = (int) await _ventasRepository.Editar(modelos);
            if (_resultado == 0)
            {
                return StatusCode(StatusCodes.Status200OK, new { valor = _resultado, msg = "Ok" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { valor = _resultado});
            }

        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
