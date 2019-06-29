using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebApplication1.DAL;

namespace WebApplication1.Validation
{
    public class UniqueCodeEvent:ValidationAttribute
    {
        private SchoolContext db = new SchoolContext(); 
        

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            
            if (!db.Events.Any(x => x.EventCode == value))
            {
                return ValidationResult.Success;
            }
            return new ValidationResult
                    ("This code already exists"); 
        }
    }
}