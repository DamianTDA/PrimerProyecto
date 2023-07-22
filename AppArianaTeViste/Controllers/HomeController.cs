using AppArianaTeViste.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AppArianaTeViste.Repository.Contrato;


namespace AppArianaTeViste.Controllers
{
    public class HomeController : Controller
    {

        private readonly ILogger<HomeController> _logger;
        private readonly IGenericRepository<Color> _colorRepository;

        public HomeController(ILogger<HomeController> logger,
            
            IGenericRepository<Color> colorRepository)
        {
            _logger = logger;
            _colorRepository = colorRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> ListaColor()
        {
            List<Color> lista = await _colorRepository.Lista();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpGet]
        public async Task<IActionResult>ConsultaColorPorId(int id)
        {
            Color color = await _colorRepository.GetIdentifier(id);
            return StatusCode(StatusCodes.Status200OK, color);
        }
            

        
        [HttpPost]
        public async Task<IActionResult> guardarColor([FromBody] Color modelo)
        {
            if (!ModelState.IsValid)
            {
                // Devuelve un error de validación si el modelo no es válido
                return BadRequest(ModelState);
            }

            bool _resultado = await _colorRepository.Create(modelo);
            if (_resultado)
            {
                return StatusCode(StatusCodes.Status200OK, new { valor = _resultado, msg = "Ok" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { valor = _resultado, msg = "error" });
            }
        }


        [HttpPut]
        public async Task<IActionResult> EditarColor([FromBody] Color modelo)
        {
            bool _resultado = await _colorRepository.Edit(modelo);
            if (_resultado)
                return StatusCode(StatusCodes.Status200OK, new { valor = _resultado, msg = "Ok" });
            else
                return StatusCode(StatusCodes.Status500InternalServerError, new { valor = _resultado, msg = "error" });

        }

        [HttpDelete]
        public async Task<IActionResult> EliminarColor(int id)
        {
            bool _resultado = await _colorRepository.Delete(id);
            if (_resultado)
                return StatusCode(StatusCodes.Status200OK, new { valor = _resultado, msg = "Ok" });
            else
                return StatusCode(StatusCodes.Status500InternalServerError, new { valor = _resultado, msg = "error" });

        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}