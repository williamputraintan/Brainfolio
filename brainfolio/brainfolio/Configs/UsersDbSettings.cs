using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace brainfolio.Configs
{   
    // variables must be exactly the same name in appsettings.json
    public class UsersDbSettings: IUsersDbSettings
    {
        public string UserCollectionsName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
    public interface IUsersDbSettings
    {
        string UserCollectionsName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
