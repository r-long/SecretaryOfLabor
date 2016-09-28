require(['N/search'], function(search) {
2		   var soSearch = search.create({
3		                    type: search.Type.TRANSACTION,
4		                    filters: [
5		                        search.createFilter({
6		                            name: 'mainline',
7		                            operator: search.Operator.IS,
8		                            values: 'T'
9		                        }),
10		                        search.createFilter({
11		                            name: 'type',
12		                            join: 'appliedtotransaction',
13		                            operator: search.Operator.IS,
14		                            values: 'SalesOrd'
15		                          })//,
16		                        // search.createFilter({
17		                        //     name: 'appliedtotransaction',
18		                        //     operator: search.Operator.IS,
19		                        //     values: createdFrom
20		                        // })
21		                    ],
22		                    columns: [
23		                        search.createColumn({
24		                            name: 'appliedtotransaction'
25		                        }),
26		                        search.createColumn({
27		                            name: 'custcol_stm_preset_mileage',
28		                            join: 'appliedtotransaction'
29		                        }),
30
31		                    ]
32
33		                });
34
35		                var searchResults = soSearch.run().getRange({
36		                    start: 0,
37		                    end: 1000
38		                });
39
40		   var x = 0;
41		});
