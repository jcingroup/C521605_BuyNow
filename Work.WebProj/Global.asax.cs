using DotWeb.CommSetup;
using System;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
namespace DotWeb.AppStart
{
    public class MvcApplication : System.Web.HttpApplication
    {
        string VarCookie = CommWebSetup.WebCookiesId;
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();

            //DisplayModeProvider.Instance.Modes.Insert(0, new DefaultDisplayMode("tablet")
            //{
            //    ContextCondition = (x => (new WebInfo()).isTablet()) 
            //});
        }
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            HttpCookie WebLang = Request.Cookies[VarCookie + ".Lang"];
            var set_lang = string.Empty;
            string[] allow_lang = new string[] { "zh-TW" };
            var fource_lang = string.Empty; //預設強制語系 
            fource_lang = allow_lang[0]; //不預強制語系 此行註解

            var query_lang = Request.QueryString["lang"]; //參數切換語系 參數查詢列為高優先權

            if (!string.IsNullOrEmpty(query_lang) && allow_lang.Contains(query_lang))
            {
                var n = System.Globalization.CultureInfo.CreateSpecificCulture(query_lang);//網址定語系
                set_lang = n.Name;
                WebLang = new HttpCookie(VarCookie + ".Lang", set_lang);
                Response.Cookies.Add(WebLang);
            }
            else if (WebLang == null)
            {
                if (!string.IsNullOrEmpty(fource_lang))
                {
                    var q = fource_lang;
                    var n = System.Globalization.CultureInfo.CreateSpecificCulture(q);//轉換完整 語系-國家 編碼
                    set_lang = n.Name;
                }
                else if (Request.UserLanguages != null && Request.UserLanguages.Length > 0)
                {
                    var q = Request.UserLanguages[0];
                    var n = System.Globalization.CultureInfo.CreateSpecificCulture(q);//轉換完整 語系-國家 編碼

                    if (allow_lang.Contains(n.Name))
                        set_lang = n.Name;
                    else
                        set_lang = allow_lang[0];
                }
                else
                {
                    var n = System.Threading.Thread.CurrentThread.CurrentCulture;
                    if (allow_lang.Contains(n.Name))
                        set_lang = n.Name;
                    else
                        set_lang = allow_lang[0];
                }
                WebLang = new HttpCookie(VarCookie + ".Lang", set_lang);
                Response.Cookies.Add(WebLang);
            }
            else
            {
                if (!allow_lang.Contains(WebLang.Value))
                {
                    set_lang = allow_lang[0];
                    WebLang.Value = set_lang;
                }
            }

            System.Threading.Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(WebLang.Value);
            System.Threading.Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(System.Threading.Thread.CurrentThread.CurrentCulture.Name, false);

        }
    }
}
