using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.Extensions.Logging;

namespace RPG.FingerCounting.Domain.Logic.Services
{
    public class RPYService
    {
        private static readonly HttpClient _client = new HttpClient();
        private static readonly string _baseUrl = "http://192.168.100.67:5000/api/remotes";
        private readonly ILogger<RPYService> _logger;


        public RPYService(ILogger<RPYService> logger)
        {
            _logger = logger;
        }

        public async Task<string> AddRemote(string remoteName, string remoteDescription )
        {
            try
            {
                var body = new Dictionary<string, string>
                {
                    {"remoteName", remoteName},
                    {"remoteDescription", remoteDescription}
                };
                var content = new FormUrlEncodedContent(body);
                var response = await _client.PostAsync(_baseUrl + "/createRemote", content);
                if (response.IsSuccessStatusCode)
                { 
                    var responseString = await response.Content.ReadAsStringAsync();
                    string result = responseString.Trim();
                    result = result.Substring(0, result.LastIndexOf("\""));
                    _logger.LogCritical(responseString);
                    return result.Substring(1);
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }
               
            } catch (Exception e)
            {
                _logger.LogCritical(e.Message);
                return e.Message;
            }

        }

        public async Task<string> AddButton(string remoteData, string buttonName)
        {
            try
            {
                var body = new Dictionary<string, string>
                {
                    {"remoteData", remoteData},
                    {"buttonName", buttonName}
                };
                var content = new FormUrlEncodedContent(body);
                var response = await _client.PostAsync(_baseUrl + "/addButton", content);
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    string result = responseString.Trim();
                    result = result.Substring(0, result.LastIndexOf("\""));
                    _logger.LogCritical(responseString);
                    return result.Substring(1);
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }
            }
            catch (Exception e)
            {
                _logger.LogCritical(e.Message);
                return e.Message;
            }
        }

        public async Task<string> RemoveButton(string remoteData, string buttonName)
        {
            try
            {
                var body = new Dictionary<string, string>
                {
                    {"remoteData", remoteData},
                    {"buttonName", buttonName}
                };
                var content = new FormUrlEncodedContent(body);
                var response = await _client.PostAsync(_baseUrl + "/deleteButton", content);
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await response.Content.ReadAsStringAsync();
                    string result = responseString.Trim();
                    result = result.Substring(0, result.LastIndexOf("\""));
                    result = result.Replace("\\", "");
                    _logger.LogCritical(responseString);
                    return result.Substring(1);
                }
                else
                {
                    throw new Exception(response.ReasonPhrase);
                }
            }
            catch (Exception e)
            {
                _logger.LogCritical(e.Message);
                return e.Message;
            }
        }
    }
}
