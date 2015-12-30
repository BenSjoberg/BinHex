"use strict";

$('tr').click(function()
{
    //Clicking anywhere in a row highlights that row's input
    $('textarea', this).focus();
});

function doConversions(value, base)
{
    //If value is blank, just clear everything
    if(value=="")
    {
        $('#bin, #hex, #dec, #octal').val('').css({'height':'auto'});
        return;
    }

    var bi=bigInt(value, base);

    //Binary
    if(base!=2)
    {
        $('#bin').val(formatBin(bi.toString(2)));
        resizeTextarea($('#bin'));
    }

    //Hexadecimal
    if(base!=16)
    {
        $('#hex').val(formatHex(bi.toString(16)));
        resizeTextarea($('#hex'));
    }

    //Decimal
    if(base!=10)
    {
        $('#dec').val(formatDec(bi.toString(10)));
        resizeTextarea($('#dec'));
    }

    //Octal
    if(base!=8)
    {
        $('#octal').val(formatOctal(bi.toString(8)));
        resizeTextarea($('#octal'));
    }
}

function formatBin(bin)
{
    return bin.replace(/(.)(?=(.{8})+$)/g, '$1 ');;
}

function formatHex(hex)
{
    return hex.replace(/(.)(?=(.{2})+$)/g, '$1 ');;
}

function formatDec(dec)
{
    return dec.replace(/(.)(?=(.{3})+$)/g, '$1,');
}

function formatOctal(octal)
{
    return octal;
}

function resizeTextarea(textarea)
{
    textarea.css({'height':'auto'}).height(textarea.get(0).scrollHeight);
}

//Handle binary input
$('#bin').on('input', function()
{
    //Remove non-binary characters
    var text=$(this).val().replace(/[^0-1]/g,'');

    doConversions(text, 2);
    $(this).val(formatBin(text));
    resizeTextarea($(this));
});

//Handle hexadecimal input
$('#hex').on('input', function()
{
    //Remove non-hexadecimal characters
    var text=$(this).val().replace(/[^0-9a-fA-F]/g,'');

    doConversions(text, 16);
    $(this).val(formatHex(text));
    resizeTextarea($(this));
});

//Handle decimal input
$('#dec').on('input', function()
{
    //Remove non-decimal characters
    var text=$(this).val().replace(/[^0-9]/g,'');

    doConversions(text, 10);
    $(this).val(formatDec(text));
    resizeTextarea($(this));
});

//Handle octal input
$('#octal').on('input', function()
{
    //Remove non-octal characters
    var text=$(this).val().replace(/[^0-7]/g,'');

    doConversions(text, 8);
    $(this).val(formatOctal(text));
    resizeTextarea($(this));
});
