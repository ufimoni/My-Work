module.exports = function replaceHTML(template, products){    // module.export is used to export the replacehmtl() into our code where we are working from

    let output = template.replace('{{%Images%}}', products.Image);
    output = output.replace('{{%NAME%}}', products.name);
    output = output.replace('{{%ModelName%}}',products.model_name);
    output = output.replace('{{%ModelNumber%}}',products.model_number);
    output = output.replace('{{%Size%}}', products.size);
    output = output.replace('{{%Camera%}}', products.camera);
    output = output.replace('{{%Price%}}', products.price);
    output = output.replace('{{%Color%}}',products.color);
    output = output.replace('{{%ROM%}}', products.ROM);
    output = output.replace('{{%Description%}}', products.Description);
    output = output.replace('{{%ID%}}',products.id); // Here we want to replace it with our ID.

    return output;
}

