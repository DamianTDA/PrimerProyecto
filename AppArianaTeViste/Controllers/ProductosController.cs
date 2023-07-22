using AppArianaTeViste.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AppArianaTeViste.Repository.Contrato;
using AppArianaTeViste.Repository.Implementacion;
using System.Reflection;

namespace AppArianaTeViste.Controllers
{
    public class ProductosController : Controller
    {

        private readonly ILogger<ProductosController> _logger;
        private readonly IGenericRepository<Producto> _productoRepository;
        

        public ProductosController(ILogger<ProductosController> logger,
            IGenericRepository<Producto> productoRepository)
            
        {
            _logger = logger;
            _productoRepository = productoRepository;
            
        }

        // GET: ProductosController
        public IActionResult Producto()
        {
            return View();
        }

        // GET: ProductosController/ListaDesc/
       

        [HttpPost]
        public async Task<IActionResult> ListaDesc([FromBody] string descripcion)
        {
            List<Producto> lista = await _productoRepository.ListaString(descripcion);
            if (lista.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, lista);

            }else return StatusCode(StatusCodes.Status400BadRequest, lista);
            


        }
        // GET: ProductosController/Details/5
        [HttpGet]
        public async Task<IActionResult>Details(int id)
        {
            Producto _product = await _productoRepository.GetIdentifier(id);
            return StatusCode(StatusCodes.Status200OK, _product);
        }

        // GET: ProductosController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProductosController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProductosController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ProductosController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProductosController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ProductosController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
