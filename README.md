# Gladys NetworkScanner

Gladys hooks to scan network to find user devices and detect user presence at home.

Need Gladys version >= 3.4.3.

## Documentation

To install this module : 

- Be sure **nmap** is installed on your system. On any Linux system, execute `sudo apt-get install nmap` on your machine.
- Install the module in Gladys
- Create a Gladys Param in `Parametres` => `Parametres` with name `NETWORK_SCANNER_HOSTS`. Put inside the IP range you want to scan at home. For example, you can put `192.168.1.0/25` if your IP looks like 192.168.1.1 in your local network. You can put several IP separated with comas.
- Create a Gladys param with name `NETWORK_SCANNER_FREQUENCY_IN_MINUTE` to define the frequency in minute to scan your network.
- Reboot Gladys