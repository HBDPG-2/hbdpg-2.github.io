# HBDPG-2

## Contents

* [About](#about)
* [Advanced features](#advanced-features)
* [Built-in security features](#built-in-security-features)
* [Risks and Recommendations](#risks-and-recommendations)
* [Feedback](#feedback)

## About

**HBDPG-2** *(Hashing-based Deterministic Password Generator – 2nd Gen)* is a open-source, cross-platform Web-application for deterministic password generation with a focus on security and brute-force attack resistance.

To generate a password, you must use **two different passphrases** that are at least 8 characters long. **Use strong passphrases** to make brute-force attacks more difficult! You can also use "Advanced features" to enhance security.

The generated password is 32 characters long by default and contains uppercase letters, lowercase letters, numbers, and symbols. This meets all modern password standards.

The generation result is deterministic. The generated password is not stored anywhere. Next time you need this password, enter your passphrases to get it.

## Advanced features

> **Warning!** Changing these parameters affects the generation! **Remember your changes** to get the same password next time.

### Password length

You can choose the password length from three types:
* **Lite** – 16 characters *(minimum length recommended by CISA)*
* **Standard** – 32 characters *(default)*
* **Ultra** – 64 characters *(enhanced security)*

### Custom Character Tables

> Will be added later...

## Built-in security features

* **High device performance requirements** slow down the algorithm and make brute-force attacks more difficult.

* **2-Factor Deterministic Generation (2-FDG)** significantly increases the possible number of combinations and make brute-force attacks more difficult.

* **Reversibility Protection** prevents the generated hash and passphrases from being revealed if your password is compromised.

* **Result Checking** ensures that the generated password meets all security requirements and standards.

## Risks and Recommendations

The main risk of using HBDPG-2 is the ability of an attacker to brute-force simple and popular passphrases to find out your password.

**Do not use weak and short passphrases!**

**Do not use HBDPG-2 on untrusted or compromised devices!**

**Do not store passphrases or passwords in plain text!** If you must store them, use encryption (e.g. AES).

**Use unique passwords for each account.**

**Use 2FA (MFA)** on all accounts whenever possible!

## Feedback

You can give feedback, ask a question or suggest an improvement on [this page](https://github.com/Piotr-Kniaz/HBDPG-2/discussions).

If you find a bug, you can report it on [this page](https://github.com/Piotr-Kniaz/HBDPG-2/issues).

If you have discovered a vulnerability, please read the [Security Policy](https://github.com/Piotr-Kniaz/HBDPG-2/blob/master/SECURITY.md) and report the issue **privately!**