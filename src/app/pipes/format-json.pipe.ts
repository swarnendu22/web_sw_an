import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonPrittify',
})

export class JsonPrittifyPipe implements PipeTransform {
  transform(value: any): any {
    return syntaxHighlight(value)
  }
}
// app.filter('prettify', function () {

function syntaxHighlight(json) {
    json = JSON.stringify(json, undefined, 2).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/,/g, ',');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

//   return syntaxHighlight;
// });