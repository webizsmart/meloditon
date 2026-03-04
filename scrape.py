import urllib.request

try:
    url = "https://gemini.google.com/share/9d085f916e69"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36'}
    req = urllib.request.Request(url, headers=headers)
    html = urllib.request.urlopen(req).read().decode('utf-8')
    
    with open('page_html.txt', 'w', encoding='utf-8') as f:
        f.write(html)
except Exception as e:
    with open('page_html.txt', 'w', encoding='utf-8') as f:
        f.write("Error: " + str(e))
