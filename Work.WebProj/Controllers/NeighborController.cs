using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;
using System.Collections.Generic;
using System.Linq;

namespace DotWeb.Controllers
{
    public class NeighborController : WebUserController
    {
        public ActionResult Index()
        {
            return View("Neighbor");
        }
        public ActionResult List()
        {
            return View("Neighbor_list");
        }
        public ActionResult Content()
        {
            return View("Neighbor_content");
        }
        public ActionResult Notice()
        {
            return View("Notice");
        }
        public ActionResult Sell_list()
        {
            return View("Neighbor_sell_list");
        }
        public ActionResult Sell_content()
        {
            return View("Neighbor_sell_content");
        }
        public ActionResult Rent_list()
        {
            return View("Neighbor_rent_list");
        }
        public ActionResult Rent_content()
        {
            return View("Neighbor_rent_content");
        }

        // 假資料用
        public ActionResult Content2()
        {
            return View("Neighbor_content2");
        }
        public ActionResult Sell_list2()
        {
            return View("Neighbor_sell_list2");
        }
        public ActionResult Rent_list2()
        {
            return View("Neighbor_rent_list2");
        }
    }

}
