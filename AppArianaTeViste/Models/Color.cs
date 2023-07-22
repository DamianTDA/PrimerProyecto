using System.ComponentModel.DataAnnotations;


namespace AppArianaTeViste.Models
{
    public class Color
    {
        
        public int IdColor { get; set; }

        [Required, MaxLength(20)]
        public string Descripcion { get; set; }
    }
}
