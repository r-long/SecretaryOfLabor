/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search'],

    function(record, search) {

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function beforeLoad(scriptContext) {

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function beforeSubmit(scriptContext) {

        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function afterSubmit(context) {
            var wo = context.newRecord;
            var wo_id = wo.getValue('id');
            var wo_rec = record.load({
                type: record.Type.WORK_ORDER,
                id: wo_id
            });

            var createdFrom = wo_rec.getValue('createdfrom');

            log.debug(createdFrom);

            if (createdFrom) {

                var soSearch = search.create({
                    type: search.Type.TRANSACTION,
                    filters: [search.createFilter({
                            name: 'internalid',
                            operator: search.Operator.ANYOF,
                            values: wo_id
                        }),
                        search.createFilter({
                            name: 'mainline',
                            operator: search.Operator.IS,
                            values: 'T'
                        }),
                        search.createFilter({
                            name: 'type',
                            join: 'appliedtotransaction',
                            operator: search.Operator.IS,
                            values: 'SalesOrd'
                        }),
                        search.createFilter({
                            name: 'appliedtotransaction',
                            operator: search.Operator.IS,
                            values: createdFrom
                        })
                    ],
                    columns: [
                        search.createColumn({
                            name: 'appliedtotransaction'
                        }),
                        search.createColumn({
                            name: 'custcol_stm_preset_mileage',
                            join: 'appliedtotransaction'
                        }),

                    ]

                });

                var searchResults = soSearch.run().getRange({
                    start: 0,
                    end: 1000
                });

                if (searchResults) {
                    var sresults = searchResults[0].getValue('custcol_stm_preset_mileage', 'appliedtotransaction');
                    wo_rec.setFieldValue('custbody_stm_wo_preset_mileage', sresults);
                    wo_rec.save();
                }

            }
            wo_rec.setValue('custbody_stm_wo_preset_mileage', '123456');
              wo_rec.save();


                log.debug(wo_rec);



        }

        return {
            //  beforeLoad: beforeLoad,
            //  beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };

    });
