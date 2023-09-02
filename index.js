function openTab(tabName)
    {
      switch(tabName)
      {
        case 'PDFToWord':
        window.open("https://www.ilovepdf.com/pdf_to_word", "_self");
          break;
        case 'WordToPDF':
        window.open("https://www.ilovepdf.com/word_to_pdf", "_self");
          break;
        case 'PDFCompressor':
        window.open("https://www.ilovepdf.com/compress_pdf", "_self");
          break;
          case 'IMGCompressor':
        window.open("https://www.iloveimg.com/compress-image", "_self");
          break;
          default:  alert(tabName+" is not a valid tab name !!");
      }
    }