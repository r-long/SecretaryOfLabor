


require(['N/record'], function(record) {
    function findCustItem() {


var text = [
{"id":"1694","value":"052InsO-ringoncan?/InsertO-ring en bote?"},
{"id":"1693","value":"052InsO-ringoncan2/InsertO-ring en bote2?"}

];




for ( i = 0;i < text.length; i++ ){
var id = text[i].id ;
var value = text[i].value;

//console.log(text[i].id , + '  '+ text[i].value);
var rec = record.load({
    type: 'itemCustomField',
  //  internalId: 'custitem_as_052'
       id : id

});
 rec.setValue({
     fieldId: 'label',
     value: value
 });
 rec.save();
var x = x;
}

}

findCustItem();
});
