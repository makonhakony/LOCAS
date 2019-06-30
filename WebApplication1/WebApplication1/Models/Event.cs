using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Validation;

namespace WebApplication1.Models
{
    
    public class Event
    {
        
        public int EventID { get; set; }
        [Required]
        [UniqueCodeEvent(ErrorMessage ="This code already exist")]
        public string EventCode { get; set; }
        public string EventName { get; set; }
        public string EventNote { get; set; }
        public double latitude { get; set; }
        public double longtitude { get; set; }
    }
    
}