using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;
using WebApplication1.DAL;
using WebApplication1.Validation;

namespace WebApplication1.Controllers
{
    public class SharingController : Controller
    {
        private SchoolContext db = new SchoolContext();
        private SqlConnection connection;
        // GET: Sharing
        public ActionResult Index()
        {
            ViewBag.Message = "Share the event to everyone, connect people together!";

            return View();
        }
        public ActionResult Test()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(Event obj)
        {
            if (ModelState.IsValid)
            {
                AddEntity(obj);
                return Json(new { success = true, content = "Your Event is added" });
            }
            return Json(new {success= false, content="Some errors occur!"});

        }
        private void ConnectionAction(){
            string constr = ConfigurationManager.ConnectionStrings["SchoolConnectionString"].ToString();
            connection = new SqlConnection(constr);
        }

        private void AddEntity(Event obj) {

            ConnectionAction();
            SqlCommand command = new SqlCommand("AddEvent", connection);
            command.CommandType = CommandType.StoredProcedure;
            
            command.Parameters.AddWithValue("@code", obj.EventCode);
            command.Parameters.AddWithValue("@name", obj.EventName);
            command.Parameters.AddWithValue("@lat", obj.latitude);
            command.Parameters.AddWithValue("@lng", obj.longtitude);
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
        }

        //----------------------------------------------------

        public JsonResult PlaceSharingMarker()
        {
            var ListOfAddress = db.Events.ToList();
            return Json(ListOfAddress,JsonRequestBehavior.AllowGet);
        }
    }
}