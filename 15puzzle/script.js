$(document).ready(function () {
    generateTable(4);

    $(".cell-width").width(42);
    $(".cell-width").height(42);

    addCoordinates("gameTable");

    $("td").click(function (e) {
        var clicked = $(e.target);
        var visibility = clicked.css("visibility");

        /*************Console Output***************/
        var content = clicked.text();
        var coordTop = parseInt(clicked.attr("coordtop"));
        var coordLeft = parseInt(clicked.attr("coordLeft"));
        var widthCell = clicked.outerWidth();

         console.log("Number " + content);
         console.log("topCoord: " + coordTop + ", leftCoord: " + coordLeft);
        FindSiblings(coordTop, coordLeft, widthCell);
        CheckWin();
    });
});

function generateTable(size) {
    var arrayNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    arrayNumber = shuffle(arrayNumber);
    var k = 0;

    var body = document.getElementsByTagName('body')[0];
    var tb2 = document.createElement('table');
    tb2.setAttribute("id", "gameTable");
    for (var i = 0; i < size; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < size; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            td.setAttribute("class", "cell-width");
            td.innerHTML = arrayNumber[k];
            if (arrayNumber[k] == 0) td.style.visibility = "hidden";
            k++;
            td.setAttribute("value", k);
        }
        tb2.appendChild(tr);
    }
    body.appendChild(tb2);
}

function addCoordinates(id) {
    var table = document.getElementById(id);
    var rows = table.getElementsByTagName("tr");


    for (var i = 0; i < rows.length; i++) {
        var tdArray = rows[i].getElementsByTagName("td");
        for (var j = 0; j < rows.length; j++) {
            /*var topCoord = tdArray[j].offsetTop;
            var leftCoord = tdArray[j].offsetLeft;*/

            var topCoord = $(tdArray[j]).position().top;
            var leftCoord = $(tdArray[j]).position().left;

            /*var topCoord = tdArray[j].getBoundingClientRect().top;
            var leftCoord = tdArray[j].getBoundingClientRect().left;*/

            tdArray[j].setAttribute("coordTop", topCoord);
            tdArray[j].setAttribute("coordLeft", leftCoord);
        }
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function FindSiblings(top, left, widthCell) {

    var borderSpacing = parseInt($("#gameTable").css("border-spacing"));

    var period = widthCell + borderSpacing;
    var divide_result_top = top / period;
    var divide_result_left = left / period;

    /*Элемент не имеет соседей сверху*/
    if (divide_result_top < 1) {
        if (GetElemetCoordinatesByAttributes(top + period, left) == true) {
            SwapCells(top, left, top + period, left);
        }
    }
    /*Элемент не имеет соседей снизу*/
    if (divide_result_top > 3) {
        if (GetElemetCoordinatesByAttributes(top - period, left) == true) {
            SwapCells(top, left, top - period, left);
        }
    }
    /*Элемент имеет соседей сверху и снизу*/
    if (divide_result_top > 1 && divide_result_top < 3) {
        if (GetElemetCoordinatesByAttributes(top + period, left) == true) {
            SwapCells(top, left, top + period, left);
        }
        if (GetElemetCoordinatesByAttributes(top - period, left) == true) {
            SwapCells(top, left, top - period, left);
        }
    }
    /*Элемент не имеет соседей слева*/
    if (divide_result_left < 1) {
        if (GetElemetCoordinatesByAttributes(top, left + period) == true) {
            SwapCells(top, left, top, left + period);
        }

    }
    /*Элемент не имеет соседей справа*/
    if (divide_result_left > 3) {
        if (GetElemetCoordinatesByAttributes(top, left - period) == true) {
            SwapCells(top, left, top, left - period);
        }
    }
    /*Элемент имеет соседей слева и справа*/
    if (divide_result_left > 1 && divide_result_left < 3) {
        if (GetElemetCoordinatesByAttributes(top, left + period) == true) {
            SwapCells(top, left, top, left + period);
        }
        if (GetElemetCoordinatesByAttributes(top, left - period) == true) {
            SwapCells(top, left, top, left - period);
        }
    }
};

function GetElemetCoordinatesByAttributes(coordTop, coordLeft) {

    elements = document.getElementsByTagName('td');
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute("coordtop") == coordTop && elements[i].getAttribute("coordleft") == coordLeft) {
              console.log("Sibling: topCoord _" + elements[i].getAttribute("coordtop") + ", leftCoord _" + elements[i].getAttribute("coordleft"));

            var visibility = $(elements[i]).css("visibility");
            if (visibility == "hidden") {
                return true;
            } else {
                return false;
            }
        }
    }
}

function SwapCells(fullCellTop, fullCellLeft, emptyCellTop, emptyCellLeft) {
    var fullCell = $("td[coordtop=" + fullCellTop + "][coordleft=" + fullCellLeft + "]");
    var emptyCell = $("td[coordtop=" + emptyCellTop + "][coordleft=" + emptyCellLeft + "]");
    var content = fullCell.text();

    fullCell.css("visibility", "hidden").text("");
    emptyCell.text(content).css("visibility", "visible");

}

function CheckWin() {
    var elements = document.getElementsByTagName("td");
    var k = 0;
    for (var i = 0; i < elements.length - 1; i++) {
        var content = parseInt(elements[i].innerHTML);
        if (content == i + 1) k++;
    }
    if (k == elements.length - 1) alert("Поздравляем!!! Вы выиграли!");
}