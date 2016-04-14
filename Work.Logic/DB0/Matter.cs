//------------------------------------------------------------------------------
// <auto-generated>
//     這個程式碼是由範本產生。
//
//     對這個檔案進行手動變更可能導致您的應用程式產生未預期的行為。
//     如果重新產生程式碼，將會覆寫對這個檔案的手動變更。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProcCore.Business.DB0
{
    using System;
    using System.Collections.Generic;
    
    public partial class Matter
    {
        public int matter_id { get; set; }
        public int community_id { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string address { get; set; }
        public Nullable<int> bedrooms { get; set; }
        public Nullable<int> livingrooms { get; set; }
        public Nullable<int> bathrooms { get; set; }
        public Nullable<int> rooms { get; set; }
        public Nullable<double> build_area { get; set; }
        public Nullable<double> land_area { get; set; }
        public Nullable<double> house_area { get; set; }
        public Nullable<double> balcony_area { get; set; }
        public Nullable<double> umbrella_aea { get; set; }
        public Nullable<double> public_area { get; set; }
        public Nullable<double> age { get; set; }
        public Nullable<int> buildhouses { get; set; }
        public string typeOfHouse { get; set; }
        public Nullable<int> managementFeeOfMonth { get; set; }
        public string architecture { get; set; }
        public string parking { get; set; }
        public string orientation { get; set; }
        public string guard { get; set; }
        public Nullable<bool> is_end { get; set; }
        public Nullable<bool> is_darkroom { get; set; }
        public string wall_materials { get; set; }
        public string matter_name { get; set; }
        public string zip { get; set; }
        public string info_type { get; set; }
        public string state { get; set; }
        public Nullable<System.DateTime> start_date { get; set; }
        public Nullable<System.DateTime> end_date { get; set; }
        public string title { get; set; }
        public Nullable<int> price { get; set; }
        public string sn { get; set; }
    
        public virtual Community Community { get; set; }
    }
}
