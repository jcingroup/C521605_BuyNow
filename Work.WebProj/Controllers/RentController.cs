﻿using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;
using System.Collections.Generic;
using System.Linq;

namespace DotWeb.Controllers
{
    public class RentController : WebUserController
    {
        public ActionResult Index()
        {
            return View("Rent");
        }
    }

}
