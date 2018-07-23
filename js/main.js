// Variables
const playground = $('.playground');
const message = $('#message');

$(document).ready(function () {
    // hide .playground for .start-game -> css("propertyname","value");
    playground.css('display', 'none');

    // functions for the array of word letters
    function word(array_of_word_letters) {
        const length_array_of_word_letters = array_of_word_letters.length;

        this.createLettersDivs = function () {
            for (let i = 0; i < length_array_of_word_letters; i++) {
                $('#word').append(
                    '<div class="' + array_of_word_letters[i] + '">' + '*' + '</div>'
                );
            }
        };

        this.showLetterIfIsRight = function (letter_value) {
            for (let i = 0; i < length_array_of_word_letters; i++) {
                let letterIsShowed = true;

                let div_letter = '.' + array_of_word_letters[i];
                
                if (letter_value === array_of_word_letters[i]) {
                    // .text(text) => sets the content of each element in the set of matched elements to the specified text
                    $(div_letter).text(''); // clears *

                    $('.' + array_of_word_letters[i]).append(array_of_word_letters[i]);
                    return letterIsShowed;
                }
            }
        };
    };

    // base of words
    const array_of_word1_letters = ['C', 'O', 'D', 'E'];
    const word_1 = new word(array_of_word1_letters);
    const array_of_word2_letters = ['W', 'I', 'S', 'D', 'O', 'M'];
    const word_2 = new word(array_of_word2_letters);
    const array_of_word3_letters = ['M', 'U', 'S', 'I', 'C'];
    const word_3 = new word(array_of_word3_letters);
    const array_of_word4_letters = ['T', 'E', 'N', 'D', 'E', 'R', 'N', 'E', 'S', 'S'];
    const word_4 = new word(array_of_word4_letters);
    const array_of_word5_letters = ['S', 'M', 'I', 'L', 'E'];
    const word_5 = new word(array_of_word5_letters);
    const array_of_word6_letters = ['M', 'U', 'S', 'I', 'C'];
    const word_6 = new word(array_of_word6_letters);
    const array_of_word7_letters = ['L', 'O', 'V', 'E'];
    const word_7 = new word(array_of_word7_letters);
    const array_of_word8_letters = ['P', 'A', 'S', 'S', 'I', 'O', 'N'];
    const word_8 = new word(array_of_word8_letters);
    const array_of_word9_letters = ['K', 'I', 'S', 'S'];
    const word_9 = new word(array_of_word9_letters);
    const array_of_word10_letters = ['A', 'R', 'T'];
    const word_10 = new word(array_of_word10_letters);

    // creating buttons with letters which we can click
    for (let i = 65; i < 91; i++) {
        /* The static String.fromCharCode() method returns a string 
           created from the specified sequence of UTF-16 code units.
           String.fromCharCode(65, 66, 67);      ->  returns "ABC"  */
        let char = String.fromCharCode(i);

        $('#letters').append('<button class="letter-for-click">' + char + '</button>');
    }

    $('#start-button').click(function () {

        // hide .start-game & prepare playground
        $('.start-game').hide();
        playground.show();

        // creating a random word
        const array_of_words = [word_1, word_2, word_3, word_4, word_5, word_6, word_7, word_8, word_9, word_10];
        const length_words_array = parseInt(array_of_words.length);
        let random_element = Math.floor(Math.random() * length_words_array);
        const word_to_guess = array_of_words[random_element];

        // creating divs for the searched word
        word_to_guess.createLettersDivs();
        const letters_array_for_click = $('.letter-for-click');

        let counter = 0;
        // for every letter we can click
        for (let i = 0; i < letters_array_for_click.length; i++) {

            // when we click on a letter
            $(letters_array_for_click[i]).click(function () {
                // .text() => gets the combined text contents of each element in the set of matched elements, including their descendants
                // take the value of the clicked letter                
                let letter_val = $(letters_array_for_click[i]).text();

                let guessedLetter = word_to_guess.showLetterIfIsRight(letter_val);

                const div_word = $('#word').html();

                // player wins 
                // includes() => the method determines whether an array includes a certain element, returning true or false
                if (!(div_word.includes('*'))) {
                    $('#new-game').css('display', 'block');
                    message.css('display', 'block');
                    // .text(text) => sets the content of each element in the set of matched elements to the specified text
                    message.text('Well done!');
                    newGame();
                }

                // check if the letter is in the searched word
                if (guessedLetter == true) {
                    $(letters_array_for_click[i]).css({
                        'background': '#2AFF8E',
                        'color': '#000000'
                    });
                } else {
                    $(letters_array_for_click[i]).css({
                        'background': '#FF5F49',
                        'color': '#000000'
                    });

                    // drawing hangman
                    counter++;
                    switch (counter) {
                        case 1:
                            $('.basis').css('display', 'block');
                            break;
                        case 2:
                            $('.gibbet').css('display', 'block');
                            break;
                        case 3:
                            $('.rope').css('display', 'block');
                            break;
                        case 4:
                            $('.head').css('display', 'block');
                            break;
                        case 5:
                            $('.body').css('display', 'block');
                            break;
                        case 6:
                            $('.hands').css('display', 'block');
                            break;
                        case 7:
                            // player loses 
                            $('.legs').css('display', 'block');

                            $('#new-game').css('display', 'block');

                            message.css('display', 'block');
                            message.text('End of Game!');

                            newGame();
                            counter = 0;
                            break;
                    }
                }
            });
        }
    });

    function newGame() {
        $("#yes").click(function () {
            // go() => method which loads a specific URL from the history list
            history.go(0);
        });

        $("#no").click(function () {
            playground.css('display', 'none');
            $('#end-game').css('display', 'block');
        });
    }

});
