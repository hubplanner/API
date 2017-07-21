## Get All Billing Rates

```
GET /billingRate
```

call will return all billing rates.

Server Response example below for 1 billing rate returned within an array.

```
[
    {
        "_id": "596397761a488107aafc1da2",
        "rate": 100,
        "createdDate": "2017-07-10T15:04:22.847Z",
        "updatedDate": null,
        "metadata": "",
        "label": "default",
        "currency": "USD"
    }
]
```
The following is a description of the properties in the response.

Property | Type | Description | Required
--- | --- | --- | ---
_id | *string* | id of the Billing Rate | NO
rate | *number* | Billing rate amount in given currency | *YES*
metadata | *string* | Custom Field (255 Characters) | NO
createdDate | *string* | Billing Rate Creation Date | NO
updatedDate | *string* | Billing Rate Updated Date | NO
label | *string* | The name of billing rate | *YES*
currency | *string* | Currency the rate is in | *YES*

##### Currency

The following table defines the different currencies available. Other currencies are not currently supported.

Currency | Description
--- | ---
EUR | Euro
USD | United States Dollar
SEK | Sweden Krona
GBP | United Kingdom Pound
CHF | Switzerland Franc
AUD | Australia Dollar
NZD | New Zealand Dollar
CAD | Canada Dollar
NOK | Norway Krone
DKK | Denmark Krone
INR | India Rupee
AED | United Arab Emirates Dirham
MXN | Mexico Peso
COP | Colombia Peso
CLP | Chile Peso
JPY | Japan Yen
ZAR | South Africa Rand
CNY | China Yuan Renminbi
TRY | Turkey Lira
PLN | Poland Zloty
SGD | Singapore Dollar

## Search Billing Rates
```
POST billingRate/search
```
If you only want a certain billing rates

```
{"currency" : "TRY" }
```
will return all billing rates which are Turkey Lira(TRY).

### Searchable Properties
Property | Parameters | Description
--- | --- | ---
_id | $nin, $in | billing rate id
metadata | $nin, $in | custom meta data field
label | $nin, $in | billing rate label
currency | $nin, $in | billing rate currency
rate | $nin, $in | billing rate in given currency

A successful search will return a `200` Ok response status from the server.

## Get Specific Billing Rate
Use the following command to get a specific billing rate by `id`.
```
GET /billingRate/12345678
```
Will return billing rate with the id `12345678`

A successful billing rate will return a `200` Ok response status from the server.

## Create a Billing Rate
Create a new billing rate.
```
POST /billingRate
```
An example of a Billing Rate

```
{
    "label":"internship worker",
    "currency":"USD",
    "rate": 800
}
```
The server will return the full billing rate object once created including the newly created billing rate ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a Billing Rate
Update an existing billing rate.
```
PUT /billingRate/123456789
```
will update the billing rate with the id 123456789. You must pass in the entire billing rate object in the body when updating so no values will be overwritten to default. Best practice will be to read first and then merge.

A successful update will return a `200` Ok response status from the server.

## Delete a Billing Rate
Use the following command to delete a specific billing rate by `id`.
```
DELETE /billingRate/12345678
```
Will delete billingRate with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
