(function() {
  'use strict';
  const courses = [
  {
    "id": "course1",
    "name": "Course 1 - Network Fundamentals",
    "categories": [
      {
        "id": "fundamentals",
        "name": "Fundamentals",
        "color": "#4fc3f7"
      },
      {
        "id": "protocols",
        "name": "Protocols & Addressing",
        "color": "#66bb6a"
      }
    ],
    "entries": [
      {
        "phrase": "OSI 7-Layer Model",
        "meaning": "Conceptual model dividing network communication into 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application",
        "translation": "OSI-modellen",
        "translationSv": "Konceptuell modell som delar upp nätverkskommunikation i sju lager: Fysiska, Datalänk, Nätverk, Transport, Session, Presentation, Applikation",
        "category": "fundamentals"
      },
      {
        "phrase": "TCP/IP 4-Layer Stack",
        "meaning": "Practical protocol suite with four layers: Network Access, Internet, Transport, Application",
        "translation": "TCP/IP-stacken",
        "translationSv": "Praktisk protokollsvit med fyra lager: Nätverksaccess, Internet, Transport, Applikation",
        "category": "fundamentals"
      },
      {
        "phrase": "Protocol Data Unit (PDU)",
        "meaning": "Data unit at each OSI layer: Bits (L1), Frames (L2), Packets (L3), Segments (L4), Data (L5-L7)",
        "translation": "Protokoll Data Enhet",
        "translationSv": "Dataenhet på varje OSI-lager: Bit, Ram, Paket, Segment, Data",
        "category": "fundamentals"
      },
      {
        "phrase": "Encapsulation",
        "meaning": "Process of adding headers and trailers as data moves down the OSI stack from L7 to L1",
        "translation": "Inkapsling",
        "translationSv": "Processen att lägga till huvuden och trailers när data rör sig nedåt i OSI-stacken",
        "category": "fundamentals"
      },
      {
        "phrase": "Decapsulation",
        "meaning": "Process of removing headers and trailers as data moves up the OSI stack from L1 to L7",
        "translation": "Avkapsling",
        "translationSv": "Processen att ta bort huvuden och trailers när data rör sig uppåt i OSI-stacken",
        "category": "fundamentals"
      },
      {
        "phrase": "Frame Check Sequence (FCS)",
        "meaning": "Trailer field using CRC to detect data corruption in an Ethernet frame",
        "translation": "Ramkontrollsekvens",
        "translationSv": "Trailer-fält som använder CRC för att upptäcka datakorruption i en Ethernet-ram",
        "category": "fundamentals"
      },
      {
        "phrase": "Maximum Transmission Unit (MTU)",
        "meaning": "Largest PDU size that can be transmitted in a single network layer transaction. Standard Ethernet MTU is 1500 bytes",
        "translation": "Maximal överföringsenhet",
        "translationSv": "Största PDU-storlek som kan överföras i en nätverkslager-transaktion. Standard Ethernet MTU är 1500 byte",
        "category": "fundamentals"
      },
      {
        "phrase": "Path MTU Discovery (PMTUD)",
        "meaning": "Technique to discover the minimum MTU along a network path using ICMP Fragmentation Needed messages",
        "translation": "Sökvägs-MTU-upptäckt",
        "translationSv": "Teknik för att upptäcka minsta MTU längs en nätverksväg med ICMP Fragmentation Needed-meddelanden",
        "category": "protocols"
      },
      {
        "phrase": "Single-Mode Fiber (SMF)",
        "meaning": "Fiber optic cable with small core (~9um) used for long-distance transmission with laser light source",
        "translation": "Singelmodsfiber",
        "translationSv": "Fiberoptisk kabel med liten kärna (~9um) för långdistansöverföring med laserkälla",
        "category": "fundamentals"
      },
      {
        "phrase": "Multi-Mode Fiber (MMF)",
        "meaning": "Fiber optic cable with larger core (~50/62.5um) used for shorter distances with LED light source",
        "translation": "Multimodsfiber",
        "translationSv": "Fiberoptisk kabel med större kärna (~50/62.5um) för kortare avstånd med LED-källa",
        "category": "fundamentals"
      },
      {
        "phrase": "Cat5e",
        "meaning": "Enhanced Category 5 twisted pair cable supporting up to 1000BASE-T (1 Gbps) at 100 MHz",
        "translation": "Cat5e",
        "translationSv": "Förbättrad kategori 5-partvinnad kabel som stöder upp till 1000BASE-T (1 Gbps) vid 100 MHz",
        "category": "fundamentals"
      },
      {
        "phrase": "Cat6",
        "meaning": "Category 6 twisted pair cable supporting up to 10GBASE-T at 250 MHz, limited to 55m for 10 Gbps",
        "translation": "Cat6",
        "translationSv": "Kategori 6-partvinnad kabel som stöder upp till 10GBASE-T vid 250 MHz, begränsad till 55m för 10 Gbps",
        "category": "fundamentals"
      },
      {
        "phrase": "Cat6a",
        "meaning": "Augmented Category 6 cable supporting 10GBASE-T at 500 MHz up to 100m",
        "translation": "Cat6a",
        "translationSv": "Förbättrad kategori 6-kabel som stöder 10GBASE-T vid 500 MHz upp till 100m",
        "category": "fundamentals"
      },
      {
        "phrase": "Attenuation",
        "meaning": "Signal strength loss over distance due to resistance, scattering, and absorption in the transmission medium",
        "translation": "Dämpning",
        "translationSv": "Signalförlust över avstånd på grund av resistans, spridning och absorption i överföringsmediet",
        "category": "fundamentals"
      },
      {
        "phrase": "Crosstalk (NEXT/FEXT)",
        "meaning": "Electromagnetic interference from adjacent cable pairs. NEXT is measured at the near end, FEXT at the far end",
        "translation": "Övertalning (NEXT/FEXT)",
        "translationSv": "Elektromagnetisk störning från intilliggande kabelpar. NEXT mäts vid nära änden, FEXT vid fjärränden",
        "category": "fundamentals"
      },
      {
        "phrase": "CSMA/CD",
        "meaning": "Carrier Sense Multiple Access with Collision Detection - legacy access method where devices listen before transmitting and detect collisions",
        "translation": "CSMA/CD",
        "translationSv": "Bärvågsavkänning med kollisionsdetektering - äldre accessmetod där enheter lyssnar före sändning och upptäcker kollisioner",
        "category": "fundamentals"
      },
      {
        "phrase": "Auto-negotiation",
        "meaning": "Protocol allowing devices to automatically exchange speed and duplex capabilities over a link",
        "translation": "Automatisk förhandling",
        "translationSv": "Protokoll som tillåter enheter att automatiskt utbyta hastighets- och duplexkapacitet över en länk",
        "category": "fundamentals"
      },
      {
        "phrase": "Full Duplex",
        "meaning": "Communication mode allowing simultaneous two-way data transmission on a link",
        "translation": "Full duplex",
        "translationSv": "Kommunikationsläge som tillåter samtidig tvåvägsdataöverföring på en länk",
        "category": "fundamentals"
      },
      {
        "phrase": "Half Duplex",
        "meaning": "Communication mode allowing two-way transmission but only one direction at a time",
        "translation": "Halv duplex",
        "translationSv": "Kommunikationsläge som tillåter tvåvägsöverföring men endast en riktning i taget",
        "category": "fundamentals"
      },
      {
        "phrase": "Star Topology",
        "meaning": "Network topology where all devices connect to a central switch or hub",
        "translation": "Stjärntopologi",
        "translationSv": "Nätverkstopologi där alla enheter ansluts till en central switch eller hub",
        "category": "fundamentals"
      },
      {
        "phrase": "Spine-Leaf Topology",
        "meaning": "Data center topology where every leaf switch connects to every spine switch in a full mesh, providing predictable latency and scalability",
        "translation": "Spine-Leaf-topologi",
        "translationSv": "Datacentertopologi där varje leaf-switch ansluts till varje spine-switch i ett fullt nät, vilket ger förutsägbar latens och skalbarhet",
        "category": "fundamentals"
      },
      {
        "phrase": "Mesh Topology",
        "meaning": "Network topology where devices are interconnected. Full mesh = every device to every other. Partial mesh = selective connections",
        "translation": "Nättopologi",
        "translationSv": "Nätverkstopologi där enheter är sammankopplade. Fullt nät = alla till alla. Partiellt nät = selektiva anslutningar",
        "category": "fundamentals"
      },
      {
        "phrase": "Ethernet II Frame",
        "meaning": "Frame format: Preamble (7 bytes), SFD (1), Destination MAC (6), Source MAC (6), EtherType (2), Payload (46-1500), FCS (4)",
        "translation": "Ethernet II-ram",
        "translationSv": "Ramformat: Preamble (7 byte), SFD (1), Destinations-MAC (6), Käll-MAC (6), EtherType (2), Payload (46-1500), FCS (4)",
        "category": "fundamentals"
      },
      {
        "phrase": "MAC Address",
        "meaning": "48-bit hardware address assigned to a network interface. Format: 24-bit OUI + 24-bit vendor-assigned NIC",
        "translation": "MAC-adress",
        "translationSv": "48-bitars hårdvaruadress tilldelad ett nätverksgränssnitt. Format: 24-bit OUI + 24-bit leverantörstilldelad NIC",
        "category": "fundamentals"
      },
      {
        "phrase": "Unicast MAC",
        "meaning": "MAC address targeting a single specific device. First byte ends in 0 (even)",
        "translation": "Unicast-MAC",
        "translationSv": "MAC-adress som riktar sig till en enda specifik enhet. Första byten slutar på 0 (jämnt)",
        "category": "fundamentals"
      },
      {
        "phrase": "Multicast MAC",
        "meaning": "MAC address for group communication. IPv4 multicast maps to 01:00:5E:xx:xx:xx",
        "translation": "Multicast-MAC",
        "translationSv": "MAC-adress för gruppkommunikation. IPv4-multicast mappas till 01:00:5E:xx:xx:xx",
        "category": "fundamentals"
      },
      {
        "phrase": "Broadcast MAC",
        "meaning": "MAC address FF:FF:FF:FF:FF:FF used to reach all devices on a local network segment",
        "translation": "Broadcast-MAC",
        "translationSv": "MAC-adress FF:FF:FF:FF:FF:FF för att nå alla enheter i ett lokalt nätverkssegment",
        "category": "fundamentals"
      },
      {
        "phrase": "ARP Request",
        "meaning": "Broadcast frame sent to discover the MAC address associated with a given IP address",
        "translation": "ARP-förfrågan",
        "translationSv": "Broadcast-ram som skickas för att upptäcka MAC-adressen kopplad till en given IP-adress",
        "category": "protocols"
      },
      {
        "phrase": "ARP Reply",
        "meaning": "Unicast response to an ARP request containing the requested MAC address",
        "translation": "ARP-svar",
        "translationSv": "Unicast-svar på en ARP-förfrågan som innehåller den begärda MAC-adressen",
        "category": "protocols"
      },
      {
        "phrase": "Gratuitous ARP (GARP)",
        "meaning": "ARP reply broadcast without a corresponding request, used to announce IP-MAC mapping changes or detect duplicate IPs",
        "translation": "Gratuitous ARP",
        "translationSv": "ARP-svar broadcast utan motsvarande förfrågan, används för att annonsera IP-MAC-mappningsändringar eller upptäcka dubbla IP-adresser",
        "category": "protocols"
      },
      {
        "phrase": "Proxy ARP",
        "meaning": "Technique where a router answers ARP requests on behalf of another device, enabling communication across subnets",
        "translation": "Proxy-ARP",
        "translationSv": "Teknik där en router svarar på ARP-förfrågningar för en annan enhets räkning, vilket möjliggör kommunikation över subnät",
        "category": "protocols"
      },
      {
        "phrase": "ICMP Echo Request/Reply",
        "meaning": "ICMP Type 8 (Request) and Type 0 (Reply) used by ping to test reachability and measure RTT",
        "translation": "ICMP Eko-förfrågan/Svar",
        "translationSv": "ICMP Typ 8 (Förfrågan) och Typ 0 (Svar) som används av ping för att testa tillgänglighet och mäta RTT",
        "category": "protocols"
      },
      {
        "phrase": "ICMP Destination Unreachable",
        "meaning": "ICMP Type 3 message sent when a packet cannot reach its destination, with codes for network/host/port/protocol unreachable",
        "translation": "ICMP Destination onåbar",
        "translationSv": "ICMP Typ 3-meddelande som skickas när ett paket inte kan nå sin destination",
        "category": "protocols"
      },
      {
        "phrase": "ICMP Time Exceeded",
        "meaning": "ICMP Type 11 message sent when a packet's TTL reaches zero, used by traceroute to map network paths",
        "translation": "ICMP Tid överskriden",
        "translationSv": "ICMP Typ 11-meddelande som skickas när ett pakets TTL når noll, används av traceroute för att kartlägga nätverksvägar",
        "category": "protocols"
      },
      {
        "phrase": "IPv4 Address",
        "meaning": "32-bit logical address in dotted-decimal notation (e.g., 192.168.1.1), consisting of network and host portions",
        "translation": "IPv4-adress",
        "translationSv": "32-bitars logisk adress i punkt-decimal notation (t.ex. 192.168.1.1), bestående av nätverks- och värddelar",
        "category": "protocols"
      },
      {
        "phrase": "Classful Addressing",
        "meaning": "Legacy IP addressing dividing addresses into fixed classes: A (1-126), B (128-191), C (192-223), D (224-239), E (240-255)",
        "translation": "Klassbaserad adressering",
        "translationSv": "Äldre IP-adressering som delar in adresser i fasta klasser: A, B, C, D, E",
        "category": "protocols"
      },
      {
        "phrase": "RFC 1918 Private Ranges",
        "meaning": "Private IPv4 address ranges not routable on the internet: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
        "translation": "RFC 1918 Privata intervall",
        "translationSv": "Privata IPv4-adressintervall som inte är routerbara på internet",
        "category": "protocols"
      },
      {
        "phrase": "Loopback Address",
        "meaning": "127.0.0.0/8 range used for local testing. 127.0.0.1 is the standard loopback address pointing to the local host",
        "translation": "Loopback-adress",
        "translationSv": "127.0.0.0/8-intervall för lokal testning. 127.0.0.1 är standard loopback-adress som pekar på den lokala värden",
        "category": "protocols"
      },
      {
        "phrase": "APIPA/Link-Local",
        "meaning": "169.254.0.0/16 range automatically assigned when DHCP fails to provide an IP address",
        "translation": "APIPA/Länk-lokal",
        "translationSv": "169.254.0.0/16-intervall som tilldelas automatiskt när DHCP inte kan ge en IP-adress",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Address",
        "meaning": "128-bit logical address in hexadecimal colon notation (e.g., 2001:db8::1). Supports 3.4x10^38 addresses",
        "translation": "IPv6-adress",
        "translationSv": "128-bitars logisk adress i hexadecimal kolon-notation (t.ex. 2001:db8::1). Stöder 3.4x10^38 adresser",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Global Unicast",
        "meaning": "2000::/3 - Globally routable IPv6 addresses, equivalent to public IPv4 addresses",
        "translation": "IPv6 Global Unicast",
        "translationSv": "2000::/3 - Globalt routerbara IPv6-adresser, motsvarar publika IPv4-adresser",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Unique Local",
        "meaning": "FC00::/7 - Private IPv6 addresses for local use, equivalent to RFC 1918 private ranges",
        "translation": "IPv6 Unique Local",
        "translationSv": "FC00::/7 - Privata IPv6-adresser för lokalt bruk, motsvarar RFC 1918 privata intervall",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Link-Local",
        "meaning": "FE80::/10 - Automatically assigned addresses used for communication on a single link, used by NDP",
        "translation": "IPv6 Link-Local",
        "translationSv": "FE80::/10 - Automatiskt tilldelade adresser för kommunikation på en enskild länk, används av NDP",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Multicast",
        "meaning": "FF00::/8 - IPv6 multicast addresses for one-to-many communication. Replaces IPv4 broadcast",
        "translation": "IPv6 Multicast",
        "translationSv": "FF00::/8 - IPv6-multicast-adresser för en-till-många-kommunikation. Ersätter IPv4 broadcast",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Anycast",
        "meaning": "Address assigned to multiple interfaces; packets are delivered to the nearest interface based on routing metric",
        "translation": "IPv6 Anycast",
        "translationSv": "Adress tilldelad flera gränssnitt; paket levereras till närmaste gränssnitt baserat på routingmetrik",
        "category": "protocols"
      },
      {
        "phrase": "SLAAC",
        "meaning": "Stateless Address Autoconfiguration - IPv6 hosts generate their own address using prefix from Router Advertisement and interface identifier (EUI-64 or random)",
        "translation": "SLAAC",
        "translationSv": "Tillståndslös adressautokonfiguration - IPv6-värdar genererar sin egen adress med prefix från Router Advertisement och gränssnittsidentifierare",
        "category": "protocols"
      },
      {
        "phrase": "EUI-64",
        "meaning": "Method to derive a 64-bit interface identifier from a 48-bit MAC address by inserting FFFE in the middle and flipping the 7th bit",
        "translation": "EUI-64",
        "translationSv": "Metod för att härleda en 64-bitars gränssnittsidentifierare från en 48-bitars MAC-adress",
        "category": "protocols"
      },
      {
        "phrase": "Neighbor Discovery Protocol (NDP)",
        "meaning": "IPv6 protocol replacing ARP, using ICMPv6 messages for address resolution, router discovery, and neighbor reachability",
        "translation": "NDP",
        "translationSv": "IPv6-protokoll som ersätter ARP, använder ICMPv6-meddelanden för adressupplösning, routerupptäckt och grannarnas tillgänglighet",
        "category": "protocols"
      },
      {
        "phrase": "Router Solicitation (RS)",
        "meaning": "ICMPv6 Type 133 - Sent by hosts to request Router Advertisements from local routers",
        "translation": "Router Solicitation",
        "translationSv": "ICMPv6 Typ 133 - Skickas av värdar för att begära Router Advertisement från lokala routrar",
        "category": "protocols"
      },
      {
        "phrase": "Router Advertisement (RA)",
        "meaning": "ICMPv6 Type 134 - Sent by routers to announce network prefix, default gateway, and address configuration method",
        "translation": "Router Advertisement",
        "translationSv": "ICMPv6 Typ 134 - Skickas av routrar för att annonsera nätverksprefix, standardgateway och adresskonfigurationsmetod",
        "category": "protocols"
      },
      {
        "phrase": "Neighbor Solicitation (NS)",
        "meaning": "ICMPv6 Type 135 - IPv6 equivalent of ARP Request, used to resolve a neighbor's link-layer address",
        "translation": "Neighbor Solicitation",
        "translationSv": "ICMPv6 Typ 135 - IPv6-motsvarighet till ARP Request, används för att lösa en grannes länklageradress",
        "category": "protocols"
      },
      {
        "phrase": "Neighbor Advertisement (NA)",
        "meaning": "ICMPv6 Type 136 - IPv6 equivalent of ARP Reply, responds to Neighbor Solicitation with link-layer address",
        "translation": "Neighbor Advertisement",
        "translationSv": "ICMPv6 Typ 136 - IPv6-motsvarighet till ARP Reply, svarar på Neighbor Solicitation med länklageradress",
        "category": "protocols"
      },
      {
        "phrase": "Duplicate Address Detection (DAD)",
        "meaning": "NDP mechanism where a host sends NS with its own address as target to verify uniqueness before assigning an IPv6 address",
        "translation": "DAD",
        "translationSv": "NDP-mekanism där en värd skickar NS med sin egen adress som mål för att verifiera unikhet innan IPv6-adress tilldelas",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Fragmentation",
        "meaning": "In IPv6, only the source host can fragment packets (using fragmentation header). Routers do not fragment. Uses Path MTU Discovery",
        "translation": "IPv6-fragmentering",
        "translationSv": "I IPv6 kan endast källvärden fragmentera paket. Routrar fragmenterar inte. Använder Path MTU Discovery",
        "category": "protocols"
      },
      {
        "phrase": "DHCPv6 Stateless",
        "meaning": "DHCPv6 mode providing additional parameters (DNS, domain) to hosts that obtain their address via SLAAC",
        "translation": "Tillståndslös DHCPv6",
        "translationSv": "DHCPv6-läge som ger ytterligare parametrar (DNS, domän) till värdar som får sin adress via SLAAC",
        "category": "protocols"
      },
      {
        "phrase": "DHCPv6 Stateful",
        "meaning": "DHCPv6 mode where the server assigns both IPv6 address and configuration parameters, similar to DHCPv4",
        "translation": "Tillståndsbaserad DHCPv6",
        "translationSv": "DHCPv6-läge där servern tilldelar både IPv6-adress och konfigurationsparametrar, liknande DHCPv4",
        "category": "protocols"
      }
    ]
  },
  {
    "id": "course2",
    "name": "Course 2 - Routing & Switching",
    "categories": [
      {
        "id": "switching",
        "name": "Switching",
        "color": "#ab47bc"
      },
      {
        "id": "routing",
        "name": "Routing",
        "color": "#ffa726"
      },
      {
        "id": "config",
        "name": "Configuration",
        "color": "#26a69a"
      }
    ],
    "entries": [
      {
        "phrase": "MAC Address Table",
        "meaning": "Table on a switch that maps MAC addresses to ports. Operations: Learn, Forward, Filter, Flood, Age",
        "translation": "MAC-adresstabell",
        "translationSv": "Tabell på en switch som mappar MAC-adresser till portar. Operationer: Lär, Vidarebefordra, Filtrera, Översvämma, Åldra",
        "category": "switching"
      },
      {
        "phrase": "CAM Table",
        "meaning": "Content-Addressable Memory table used for MAC address lookups in switches. Faster than TCAM for exact matches",
        "translation": "CAM-tabell",
        "translationSv": "Content-Addressable Memory-tabell för MAC-adressuppslagning i switchar. Snabbare än TCAM för exakta matchningar",
        "category": "switching"
      },
      {
        "phrase": "TCAM",
        "meaning": "Ternary Content-Addressable Memory used for ACLs and routing lookups. Stores three states: 0, 1, or don't-care",
        "translation": "TCAM",
        "translationSv": "Ternary Content-Addressable Memory för ACL- och routinguppslagning. Lagrar tre tillstånd: 0, 1 eller don't-care",
        "category": "switching"
      },
      {
        "phrase": "Port Security",
        "meaning": "Feature limiting the number and/or specific MAC addresses allowed on a switch port. Modes: Static, Dynamic, Sticky",
        "translation": "Portsäkerhet",
        "translationSv": "Funktion som begränsar antalet och/eller specifika MAC-adresser på en switchport. Lägen: Statisk, Dynamisk, Sticky",
        "category": "switching"
      },
      {
        "phrase": "Port Security Violation Modes",
        "meaning": "Protect (drops unknown frames), Restrict (drops + logs + SNMP trap), Shutdown (err-disables the port)",
        "translation": "Portsäkerhetsöverträdelselägen",
        "translationSv": "Protect (släpper okända ramar), Restrict (släpper + loggar + SNMP-fälla), Shutdown (fel-inaktiverar porten)",
        "category": "switching"
      },
      {
        "phrase": "802.1Q VLAN Tag",
        "meaning": "4-byte tag inserted into Ethernet frame: TPID (2 bytes), PCP (3 bits), DEI (1 bit), VID (12 bits). Supports VLANs 1-4094",
        "translation": "802.1Q VLAN-tagg",
        "translationSv": "4-byte-tagg i Ethernet-ram: TPID, PCP, DEI, VID. Stöder VLAN 1-4094",
        "category": "switching"
      },
      {
        "phrase": "Access Port",
        "meaning": "Switch port assigned to a single VLAN. Traffic is untagged (no 802.1Q header)",
        "translation": "Accessport",
        "translationSv": "Switchport tilldelad ett enda VLAN. Trafik är otaggad (ingen 802.1Q-header)",
        "category": "switching"
      },
      {
        "phrase": "Trunk Port",
        "meaning": "Switch port carrying traffic for multiple VLANs using 802.1Q tagging between switches",
        "translation": "Trunkport",
        "translationSv": "Switchport som bär trafik för flera VLAN med 802.1Q-taggning mellan switchar",
        "category": "switching"
      },
      {
        "phrase": "Native VLAN",
        "meaning": "VLAN assigned to untagged traffic on a trunk port. Default is VLAN 1. Mismatch causes VLAN Hopping risk",
        "translation": "Native VLAN",
        "translationSv": "VLAN tilldelat otaggad trafik på en trunkport. Standard är VLAN 1. Mismatch orsakar VLAN Hopping-risk",
        "category": "switching"
      },
      {
        "phrase": "Router-on-a-Stick",
        "meaning": "Inter-VLAN routing method using a router with a single trunk link to a switch, using subinterfaces",
        "translation": "Router-on-a-Stick",
        "translationSv": "Inter-VLAN-routingmetod med en router med en enda trunklänk till en switch, med undergränssnitt",
        "category": "routing"
      },
      {
        "phrase": "Switch Virtual Interface (SVI)",
        "meaning": "Virtual Layer 3 interface on a multilayer switch used for inter-VLAN routing without an external router",
        "translation": "SVI",
        "translationSv": "Virtuellt L3-gränssnitt på en multilayer-switch för inter-VLAN-routing utan extern router",
        "category": "switching"
      },
      {
        "phrase": "DTP",
        "meaning": "Dynamic Trunking Protocol - Cisco proprietary protocol for automatically negotiating trunk mode between switches",
        "translation": "DTP",
        "translationSv": "Dynamic Trunking Protocol - Cisco-proprietärt protokoll för automatisk trunkförhandling mellan switchar",
        "category": "switching"
      },
      {
        "phrase": "VLAN Hopping",
        "meaning": "Attack exploiting DTP or Native VLAN misconfiguration to gain unauthorized access to another VLAN",
        "translation": "VLAN Hopping",
        "translationSv": "Attack som utnyttjar DTP eller felkonfigurerad Native VLAN för att få obehörig åtkomst till ett annat VLAN",
        "category": "switching"
      },
      {
        "phrase": "Spanning Tree Protocol (STP)",
        "meaning": "802.1D protocol preventing bridge loops by creating a loop-free logical topology. Uses BPDUs to elect root bridge and block redundant ports",
        "translation": "Spanning Tree Protocol",
        "translationSv": "802.1D-protokoll som förhindrar nätverksslingor genom att skapa en loopfri logisk topologi",
        "category": "switching"
      },
      {
        "phrase": "Bridge Protocol Data Unit (BPDU)",
        "meaning": "STP frames exchanged between switches containing bridge ID, path cost, port ID, and timer values",
        "translation": "BPDU",
        "translationSv": "STP-ramar som utbyts mellan switchar med brygg-ID, vägkostnad, port-ID och timervärden",
        "category": "switching"
      },
      {
        "phrase": "Root Bridge Election",
        "meaning": "STP election process: the switch with the lowest Bridge ID (Priority + MAC address) becomes the root bridge",
        "translation": "Rotbryggval",
        "translationSv": "STP-valprocess: switchen med lägst Bridge ID blir rotbrygga",
        "category": "switching"
      },
      {
        "phrase": "STP Port Roles",
        "meaning": "Root Port (best path to root), Designated Port (best path from segment), Blocked/Non-Designated (no traffic)",
        "translation": "STP-portroller",
        "translationSv": "Root Port (bästa väg till rot), Designated Port (bästa väg från segment), Blocked/Non-Designated (ingen trafik)",
        "category": "switching"
      },
      {
        "phrase": "STP Port States",
        "meaning": "Disabled, Blocking (listen for BPDUs), Listening (prepare to forward), Learning (learn MACs), Forwarding (normal operation)",
        "translation": "STP-porttillstånd",
        "translationSv": "Inaktiverad, Blockering, Lyssning, Inlärning, Vidarebefordran",
        "category": "switching"
      },
      {
        "phrase": "Rapid STP (802.1w)",
        "meaning": "Enhanced STP with faster convergence using alternate/backup ports and proposal/agreement handshake instead of timers",
        "translation": "Rapid STP",
        "translationSv": "Förbättrad STP med snabbare konvergens genom alternativ/säkerhetskopieringsportar",
        "category": "switching"
      },
      {
        "phrase": "Multiple STP (802.1s)",
        "meaning": "MSTP maps multiple VLANs to fewer spanning tree instances, reducing CPU load while maintaining per-VLAN loop prevention",
        "translation": "Multiple STP",
        "translationSv": "MSTP mappar flera VLAN till färre spanning tree-instanser",
        "category": "switching"
      },
      {
        "phrase": "BPDU Guard",
        "meaning": "STP protection feature that err-disables a port if a BPDU is received, preventing rogue switch attacks",
        "translation": "BPDU Guard",
        "translationSv": "STP-skydd som fel-inaktiverar en port om en BPDU tas emot",
        "category": "switching"
      },
      {
        "phrase": "Root Guard",
        "meaning": "STP protection that prevents a port from becoming a root port, blocking superior BPDUs to protect root bridge status",
        "translation": "Root Guard",
        "translationSv": "STP-skydd som förhindrar en port från att bli root-port",
        "category": "switching"
      },
      {
        "phrase": "Loop Guard",
        "meaning": "STP protection that places a port into loop-inconsistent state if BPDUs stop being received, preventing unidirectional link issues",
        "translation": "Loop Guard",
        "translationSv": "STP-skydd som placerar en port i loop-inconsistent tillstånd om BPDU:er slutar tas emot",
        "category": "switching"
      },
      {
        "phrase": "UDLD",
        "meaning": "Unidirectional Link Detection - Cisco protocol that detects and shuts down unidirectional fiber links",
        "translation": "UDLD",
        "translationSv": "Unidirectional Link Detection - Cisco-protokoll som upptäcker och stänger av envägs fiberlänkar",
        "category": "switching"
      },
      {
        "phrase": "CIDR Notation",
        "meaning": "Classless Inter-Domain Routing - notation showing IP address and subnet mask length, e.g., 192.168.1.0/24",
        "translation": "CIDR-notation",
        "translationSv": "Klasslös inter-domänrouting - notation som visar IP-adress och subnätsmasklängd",
        "category": "routing"
      },
      {
        "phrase": "VLSM",
        "meaning": "Variable Length Subnet Masking - using different subnet mask lengths within the same network for efficient IP address allocation",
        "translation": "VLSM",
        "translationSv": "Variable Length Subnet Masking - användning av olika subnätsmasklängder inom samma nätverk för effektiv IP-adressallokering",
        "category": "routing"
      },
      {
        "phrase": "Subnet Mask",
        "meaning": "32-bit value used to distinguish network and host portions of an IP address. In binary, 1s = network, 0s = host",
        "translation": "Subnätsmask",
        "translationSv": "32-bitars värde som skiljer nätverks- och värddelarna av en IP-adress",
        "category": "routing"
      },
      {
        "phrase": "Usable Host Range",
        "meaning": "Formula: 2^H - 2, where H = number of host bits. Subtract 2 for network address and broadcast address",
        "translation": "Användbart värdintervall",
        "translationSv": "Formel: 2^H - 2, där H = antal värdbitar. Dra av 2 för nätverksadress och broadcastadress",
        "category": "routing"
      },
      {
        "phrase": "Wildcard Mask",
        "meaning": "Inverse subnet mask used in ACLs and OSPF. 0 = must match, 1 = don't care. Example: 0.0.0.255 matches any host",
        "translation": "Wildcard-mask",
        "translationSv": "Invers subnätsmask för ACL:er och OSPF. 0 = måste matcha, 1 = spelar ingen roll",
        "category": "routing"
      },
      {
        "phrase": "Longest Prefix Match",
        "meaning": "Routing lookup rule: the route with the most specific (longest) subnet mask is selected from the routing table",
        "translation": "Longest Prefix Match",
        "translationSv": "Routeringsregel: den mest specifika (längsta) subnätsmasken väljs från routingtabellen",
        "category": "routing"
      },
      {
        "phrase": "Administrative Distance (AD)",
        "meaning": "Trustworthiness rating of a routing source. Lower AD = more trusted. Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120",
        "translation": "Administrativt avstånd",
        "translationSv": "Trovärdighetsbetyg för en routingkälla. Lägre AD = mer pålitlig",
        "category": "routing"
      },
      {
        "phrase": "Floating Static Route",
        "meaning": "Static route with a higher AD than the primary route, used as a backup in case the dynamic route fails",
        "translation": "Flytande statisk väg",
        "translationSv": "Statisk väg med högre AD än primärvägen, används som backup om den dynamiska vägen misslyckas",
        "category": "routing"
      },
      {
        "phrase": "Default Route",
        "meaning": "0.0.0.0/0 - Route matching all destinations, used when no specific route exists in the routing table",
        "translation": "Standardväg",
        "translationSv": "0.0.0.0/0 - Väg som matchar alla destinationer när ingen specifik väg finns",
        "category": "routing"
      },
      {
        "phrase": "Equal-Cost Multipath (ECMP)",
        "meaning": "Routing technique that load-balances traffic across multiple paths with equal metric. Uses hash-based path selection",
        "translation": "ECMP",
        "translationSv": "Routerteknik som lastbalanserar trafik över flera vägar med samma metrik",
        "category": "routing"
      },
      {
        "phrase": "OSPF",
        "meaning": "Open Shortest Path First - Link-state IGP using Dijkstra's SPF algorithm. Supports areas, VLSM, fast convergence",
        "translation": "OSPF",
        "translationSv": "Open Shortest Path First - Link-state IGP med Dijkstras SPF-algoritm",
        "category": "routing"
      },
      {
        "phrase": "OSPF Router ID",
        "meaning": "32-bit identifier for an OSPF router. Determined by: configured RID > highest loopback IP > highest active interface IP",
        "translation": "OSPF Router ID",
        "translationSv": "32-bitars identifierare för en OSPF-router",
        "category": "routing"
      },
      {
        "phrase": "OSPF Hello Packet",
        "meaning": "Type 1 OSPF packet used to discover and maintain neighbor relationships. Contains router ID, timers, area ID, neighbors",
        "translation": "OSPF Hello-paket",
        "translationSv": "Typ 1 OSPF-paket för att upptäcka och underhålla granrelationer",
        "category": "routing"
      },
      {
        "phrase": "OSPF Database Description (DBD)",
        "meaning": "Type 2 OSPF packet summarizing the link-state database. Used during the ExStart and Exchange states",
        "translation": "OSPF DBD",
        "translationSv": "Typ 2 OSPF-paket som sammanfattar link-state-databasen",
        "category": "routing"
      },
      {
        "phrase": "OSPF Link State Request (LSR)",
        "meaning": "Type 3 OSPF packet requesting specific link-state advertisements from a neighbor after DBD exchange",
        "translation": "OSPF LSR",
        "translationSv": "Typ 3 OSPF-paket som begär specifika LSA från en granne",
        "category": "routing"
      },
      {
        "phrase": "OSPF Link State Update (LSU)",
        "meaning": "Type 4 OSPF packet carrying the actual link-state advertisements in response to LSRs",
        "translation": "OSPF LSU",
        "translationSv": "Typ 4 OSPF-paket som bär de faktiska LSA som svar på LSR",
        "category": "routing"
      },
      {
        "phrase": "OSPF Link State Acknowledgment (LSAck)",
        "meaning": "Type 5 OSPF packet acknowledging receipt of LSUs for reliable flooding",
        "translation": "OSPF LSAck",
        "translationSv": "Typ 5 OSPF-paket som bekräftar mottagning av LSU",
        "category": "routing"
      },
      {
        "phrase": "OSPF Neighbor States",
        "meaning": "Down, Init, 2-Way, ExStart, Exchange, Loading, Full. 2-Way is the minimum for DR/BDR elections. Full indicates complete database sync",
        "translation": "OSPF-grannstillstånd",
        "translationSv": "OSPF-grannstillstånd: Down, Init, 2-Way, ExStart, Exchange, Loading, Full",
        "category": "routing"
      },
      {
        "phrase": "OSPF DR/BDR Election",
        "meaning": "Designated Router and Backup Designated Router elected on broadcast multi-access segments. Highest Priority > Router ID wins",
        "translation": "OSPF DR/BDR-val",
        "translationSv": "Designated Router och Backup DR valda på broadcast multi-access-segment",
        "category": "routing"
      },
      {
        "phrase": "OSPF Area Types",
        "meaning": "Backbone (Area 0), Standard, Stub (no Type 5 LSAs), Totally Stubby (no Type 3/4/5), NSSA (allows limited external routes)",
        "translation": "OSPF-områdestyper",
        "translationSv": "OSPF-områdestyper: Backbone, Standard, Stub, Totally Stubby, NSSA",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 1 (Router)",
        "meaning": "Describes a router's interfaces and neighbors within the same area. Flooded within a single area only",
        "translation": "OSPF LSA Typ 1",
        "translationSv": "Beskriver en routers gränssnitt och grannar inom samma område",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 2 (Network)",
        "meaning": "Generated by the DR on broadcast segments, listing all routers attached to that segment",
        "translation": "OSPF LSA Typ 2",
        "translationSv": "Genereras av DR på broadcast-segment, listar alla routrar på segmentet",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 3 (Summary)",
        "meaning": "Used by ABRs to advertise networks from one area to another. Summarizes inter-area routes",
        "translation": "OSPF LSA Typ 3",
        "translationSv": "Används av ABR för att annonsera nätverk mellan områden",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 5 (External)",
        "meaning": "Generated by ASBRs to advertise routes from outside the OSPF domain into the OSPF network",
        "translation": "OSPF LSA Typ 5",
        "translationSv": "Genereras av ASBR för att annonsera rutter utifrån OSPF-domänen",
        "category": "routing"
      },
      {
        "phrase": "EIGRP",
        "meaning": "Enhanced Interior Gateway Routing Protocol - Cisco proprietary advanced distance vector protocol using DUAL algorithm",
        "translation": "EIGRP",
        "translationSv": "Enhanced Interior Gateway Routing Protocol - Cisco-proprietärt avancerat distance vector-protokoll med DUAL-algoritm",
        "category": "routing"
      },
      {
        "phrase": "EIGRP DUAL Algorithm",
        "meaning": "Diffusing Update Algorithm - provides loop-free path selection and fast convergence by using feasible successors",
        "translation": "EIGRP DUAL-algoritm",
        "translationSv": "Diffusing Update Algorithm - loopfri vägval och snabb konvergens",
        "category": "routing"
      },
      {
        "phrase": "EIGRP Feasible Successor",
        "meaning": "Backup route that satisfies the Feasibility Condition: Reported Distance < Feasible Distance. Provides instantaneous failover",
        "translation": "EIGRP Feasible Successor",
        "translationSv": "Backup-väg som uppfyller Feasibility Condition för omedelbar redundans",
        "category": "routing"
      },
      {
        "phrase": "EIGRP Feasibility Condition",
        "meaning": "Rule: A route is a feasible successor if the neighbor's Reported Distance (RD) is less than the current Feasible Distance (FD)",
        "translation": "EIGRP Feasibility Condition",
        "translationSv": "Regel: En väg är en feasible successor om grannens RD är mindre än nuvarande FD",
        "category": "routing"
      },
      {
        "phrase": "EIGRP K-Values",
        "meaning": "Metric weights: K1=Bandwidth, K2=Load, K3=Delay, K4=Reliability, K5=MTU. Default: K1=1, K3=1, others=0",
        "translation": "EIGRP K-värden",
        "translationSv": "Metrikvikter: K1=Bandbredd, K2=Last, K3=Fördröjning, K4=Tillförlitlighet, K5=MTU",
        "category": "routing"
      },
      {
        "phrase": "DHCP DORA Process",
        "meaning": "Discover (client broadcast), Offer (server offers IP), Request (client requests offered IP), Acknowledge (server confirms)",
        "translation": "DHCP DORA-process",
        "translationSv": "Discover, Offer, Request, Acknowledge - DHCP-processen för IP-tilldelning",
        "category": "config"
      },
      {
        "phrase": "DHCP Relay Agent",
        "meaning": "Router feature forwarding DHCP broadcasts across subnets, using the IP Helper Address (Option 82) to point to the DHCP server",
        "translation": "DHCP Relay Agent",
        "translationSv": "Routerfunktion som vidarebefordrar DHCP-broadcasts över subnät",
        "category": "config"
      },
      {
        "phrase": "DNS Record Types",
        "meaning": "A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail exchange), PTR (reverse), TXT (text), NS (nameserver), SOA (start of authority)",
        "translation": "DNS-posttyper",
        "translationSv": "DNS-posttyper: A, AAAA, CNAME, MX, PTR, TXT, NS, SOA",
        "category": "config"
      },
      {
        "phrase": "NTP Stratum",
        "meaning": "Hierarchical time source level. Stratum 0 = atomic clock, Stratum 1 = direct sync to stratum 0, up to Stratum 15",
        "translation": "NTP-stratum",
        "translationSv": "Hierarkisk tidskällenivå. Stratum 0 = atomklocka, upp till stratum 15",
        "category": "config"
      }
    ]
  },
  {
    "id": "course3",
    "name": "Course 3 - Network Security",
    "categories": [
      {
        "id": "techniques",
        "name": "Security Techniques",
        "color": "#ef5350"
      },
      {
        "id": "threats",
        "name": "Threats & Attacks",
        "color": "#ff7043"
      }
    ],
    "entries": [
      {
        "phrase": "Standard ACL",
        "meaning": "Access list filtering based on source IP only. Numbered 1-99 and 1300-1999. Place close to destination",
        "translation": "Standard ACL",
        "translationSv": "Access-lista som filtrerar baserat på käll-IP endast. Numrerad 1-99 och 1300-1999",
        "category": "techniques"
      },
      {
        "phrase": "Extended ACL",
        "meaning": "Access list filtering on source IP, destination IP, protocol, and port. Numbered 100-199 and 2000-2699. Place close to source",
        "translation": "Extended ACL",
        "translationSv": "Access-lista som filtrerar på käll-IP, destinations-IP, protokoll och port",
        "category": "techniques"
      },
      {
        "phrase": "Named ACL",
        "meaning": "Access list with a descriptive name instead of a number. Supports both standard and extended filtering",
        "translation": "Named ACL",
        "translationSv": "Access-lista med beskrivande namn istället för nummer",
        "category": "techniques"
      },
      {
        "phrase": "Implicit Deny All",
        "meaning": "ACL rule: if no permit statement matches, the packet is denied by default. Applies at the end of every ACL",
        "translation": "Implicit Deny All",
        "translationSv": "ACL-regel: om ingen permit-sats matchar, nekas paketet som standard",
        "category": "techniques"
      },
      {
        "phrase": "Packet Filter Firewall",
        "meaning": "Stateless firewall inspecting packet headers at L3-L4. Fast but lacks context awareness",
        "translation": "Paketfilter-brandvägg",
        "translationSv": "Tillståndslös brandvägg som inspekterar pakethuvuden på L3-L4",
        "category": "techniques"
      },
      {
        "phrase": "Stateful Firewall",
        "meaning": "Firewall maintaining a session table tracking connection states. Can determine if packets belong to established connections",
        "translation": "Stateful-brandvägg",
        "translationSv": "Brandvägg som upprätthåller en sessionstabell för anslutningstillstånd",
        "category": "techniques"
      },
      {
        "phrase": "NGFW",
        "meaning": "Next-Generation Firewall combining stateful inspection with DPI, application ID, user ID, and integrated IPS",
        "translation": "NGFW",
        "translationSv": "Next-Generation-brandvägg som kombinerar stateful-inspektion med DPI, app-ID, användar-ID och IPS",
        "category": "techniques"
      },
      {
        "phrase": "Deep Packet Inspection (DPI)",
        "meaning": "Firewall technology inspecting the full packet payload (not just headers) to identify applications and detect threats",
        "translation": "DPI",
        "translationSv": "Brandväggsteknik som inspekterar hela paketinnehållet för att identifiera applikationer och upptäcka hot",
        "category": "techniques"
      },
      {
        "phrase": "Static NAT",
        "meaning": "One-to-one fixed mapping between a private IP and a public IP address",
        "translation": "Statisk NAT",
        "translationSv": "En-till-en fast mappning mellan en privat och en publik IP-adress",
        "category": "techniques"
      },
      {
        "phrase": "Dynamic NAT",
        "meaning": "One-to-one mapping from a pool of private IPs to a pool of public IPs. M:N relationship",
        "translation": "Dynamisk NAT",
        "translationSv": "En-till-en-mappning från en pool privata IP-adresser till en pool publika IP-adresser",
        "category": "techniques"
      },
      {
        "phrase": "PAT (NAT Overload)",
        "meaning": "Port Address Translation - maps many private IPs to a single public IP using unique port numbers",
        "translation": "PAT",
        "translationSv": "Port Address Translation - mappar många privata IP-adresser till en enda publik IP med unika portnummer",
        "category": "techniques"
      },
      {
        "phrase": "NAT Inside Local",
        "meaning": "Private IP address of a device inside the internal network before translation",
        "translation": "NAT Inside Local",
        "translationSv": "Privat IP-adress för en enhet i det interna nätverket före översättning",
        "category": "techniques"
      },
      {
        "phrase": "NAT Inside Global",
        "meaning": "Public IP address assigned to an internal device after NAT translation",
        "translation": "NAT Inside Global",
        "translationSv": "Publik IP-adress tilldelad en intern enhet efter NAT-översättning",
        "category": "techniques"
      },
      {
        "phrase": "DMZ",
        "meaning": "Demilitarized Zone - separate network segment between internal and external networks hosting public-facing services",
        "translation": "DMZ",
        "translationSv": "Demilitariserad zon - separat nätverkssegment mellan internt och externt nätverk för publika tjänster",
        "category": "techniques"
      },
      {
        "phrase": "Three-Legged Firewall",
        "meaning": "Firewall with three interfaces: external (internet), internal (LAN), and DMZ (public services)",
        "translation": "Trebenad brandvägg",
        "translationSv": "Brandvägg med tre gränssnitt: externt (internet), internt (LAN) och DMZ (publika tjänster)",
        "category": "techniques"
      },
      {
        "phrase": "Symmetric Encryption",
        "meaning": "Encryption using the same key for both encryption and decryption. Examples: AES, 3DES. Fast but key distribution is challenging",
        "translation": "Symmetrisk kryptering",
        "translationSv": "Kryptering med samma nyckel för både kryptering och dekryptering",
        "category": "techniques"
      },
      {
        "phrase": "Asymmetric Encryption",
        "meaning": "Encryption using a public-private key pair. Examples: RSA, ECC. Slower but solves key distribution",
        "translation": "Asymmetrisk kryptering",
        "translationSv": "Kryptering med ett publik-privat nyckelpar",
        "category": "techniques"
      },
      {
        "phrase": "IPsec ESP",
        "meaning": "Encapsulating Security Payload - IPsec protocol providing confidentiality (encryption), integrity, and authentication. Transport mode encrypts payload only, Tunnel mode encrypts entire packet",
        "translation": "IPsec ESP",
        "translationSv": "IPsec-protokoll som ger konfidentialitet (kryptering), integritet och autentisering",
        "category": "techniques"
      },
      {
        "phrase": "IPsec AH",
        "meaning": "Authentication Header - IPsec protocol providing integrity and authentication but no encryption",
        "translation": "IPsec AH",
        "translationSv": "IPsec-protokoll som ger integritet och autentisering men ingen kryptering",
        "category": "techniques"
      },
      {
        "phrase": "IKEv1 Main Mode",
        "meaning": "ISAKMP Phase 1 negotiation using 6 packets. More secure than Aggressive Mode. Negotiates HAGLE parameters: Hash, Auth, DH Group, Lifetime, Encryption",
        "translation": "IKEv1 Main Mode",
        "translationSv": "ISAKMP Fas 1-förhandling med 6 paket. Förhandlar HAGLE-parametrar",
        "category": "techniques"
      },
      {
        "phrase": "IKEv1 Aggressive Mode",
        "meaning": "ISAKMP Phase 1 using 3 packets. Faster but less secure as identities are sent in cleartext before encryption is established",
        "translation": "IKEv1 Aggressive Mode",
        "translationSv": "ISAKMP Fas 1 med 3 paket. Snabbare men mindre säkert",
        "category": "techniques"
      },
      {
        "phrase": "Perfect Forward Secrecy (PFS)",
        "meaning": "IPsec feature ensuring that if a private key is compromised, past session keys remain secure by generating new Diffie-Hellman keys per session",
        "translation": "PFS",
        "translationSv": "IPsec-funktion som säkerställer att tidigare sessionsnycklar förblir säkra även om en privat nyckel komprometteras",
        "category": "techniques"
      },
      {
        "phrase": "GRE Tunnel",
        "meaning": "Generic Routing Encapsulation - tunneling protocol encapsulating packets over IP. No encryption, often used with IPsec",
        "translation": "GRE-tunnel",
        "translationSv": "Generic Routing Encapsulation - tunnelprotokoll som kapslar in paket över IP",
        "category": "techniques"
      },
      {
        "phrase": "DMVPN",
        "meaning": "Dynamic Multipoint VPN - Cisco solution combining mGRE, NHRP, and IPsec for scalable hub-and-spoke VPN with direct spoke-to-spoke tunnels",
        "translation": "DMVPN",
        "translationSv": "Dynamic Multipoint VPN - Cisco-lösning för skalbar hub-and-spoke-VPN",
        "category": "techniques"
      },
      {
        "phrase": "AAA Framework",
        "meaning": "Authentication (who you are), Authorization (what you can do), Accounting (what you did)",
        "translation": "AAA-ramverk",
        "translationSv": "Autentisering (vem du är), Auktorisation (vad du får göra), Redovisning (vad du gjorde)",
        "category": "techniques"
      },
      {
        "phrase": "TACACS+",
        "meaning": "Cisco proprietary AAA protocol. TCP port 49. Encrypts entire packet payload. Separates authentication and authorization",
        "translation": "TACACS+",
        "translationSv": "Cisco-proprietärt AAA-protokoll. TCP port 49. Krypterar hela paketinnehållet",
        "category": "techniques"
      },
      {
        "phrase": "RADIUS",
        "meaning": "Open standard AAA protocol. UDP ports 1812/1813. Encrypts password only. Combines authentication and authorization",
        "translation": "RADIUS",
        "translationSv": "Öppen standard AAA-protokoll. UDP-portar 1812/1813. Krypterar endast lösenord",
        "category": "techniques"
      },
      {
        "phrase": "802.1X",
        "meaning": "Network access control standard using three roles: Supplicant (client), Authenticator (switch/AP), Authentication Server (RADIUS)",
        "translation": "802.1X",
        "translationSv": "Nätverksaccesskontrollstandard med tre roller: Supplicant, Authenticator, Authentication Server",
        "category": "techniques"
      },
      {
        "phrase": "MAC Flooding",
        "meaning": "Attack flooding a switch with fake MAC addresses to overflow the CAM table, causing it to fail-open and flood traffic",
        "translation": "MAC-översvämning",
        "translationSv": "Attack som översvämmar en switch med falska MAC-adresser för att överfylla CAM-tabellen",
        "category": "threats"
      },
      {
        "phrase": "DHCP Starvation",
        "meaning": "Attack sending forged DHCP requests to exhaust a DHCP server's IP address pool",
        "translation": "DHCP-utarmning",
        "translationSv": "Attack med förfalskade DHCP-förfrågningar för att tömma en DHCP-servers IP-adresspool",
        "category": "threats"
      },
      {
        "phrase": "DHCP Snooping",
        "meaning": "Security feature filtering DHCP messages by distinguishing trusted (server-facing) from untrusted (client-facing) ports",
        "translation": "DHCP Snooping",
        "translationSv": "Säkerhetsfunktion som filtrerar DHCP-meddelanden mellan betrodda och icke-betrodda portar",
        "category": "techniques"
      },
      {
        "phrase": "ARP Poisoning",
        "meaning": "Man-in-the-middle attack sending forged ARP messages to associate an attacker's MAC with a victim's IP address",
        "translation": "ARP-förgiftning",
        "translationSv": "Man-in-the-middle-attack med förfalskade ARP-meddelanden",
        "category": "threats"
      },
      {
        "phrase": "Dynamic ARP Inspection (DAI)",
        "meaning": "Security feature validating ARP packets against the DHCP Snooping binding table to prevent ARP poisoning",
        "translation": "DAI",
        "translationSv": "Säkerhetsfunktion som validerar ARP-paket mot DHCP Snooping-bindningstabellen",
        "category": "techniques"
      },
      {
        "phrase": "IP Source Guard (IPSG)",
        "meaning": "Security feature filtering IP traffic based on the DHCP Snooping binding table, preventing IP spoofing",
        "translation": "IPSG",
        "translationSv": "Säkerhetsfunktion som filtrerar IP-trafik baserat på DHCP Snooping-bindningstabellen",
        "category": "techniques"
      },
      {
        "phrase": "SYN Flood",
        "meaning": "DoS attack sending many TCP SYN requests without completing the three-way handshake, exhausting server resources",
        "translation": "SYN-översvämning",
        "translationSv": "DoS-attack med många TCP SYN-förfrågningar utan att slutföra trevägshandskakningen",
        "category": "threats"
      },
      {
        "phrase": "SYN Cookies",
        "meaning": "Defense against SYN flood where the server encodes connection state in the SYN-ACK sequence number, avoiding resource allocation until handshake completes",
        "translation": "SYN Cookies",
        "translationSv": "Försvar mot SYN-flood där servern kodar anslutningstillstånd i SYN-ACK-sekvensnumret",
        "category": "techniques"
      },
      {
        "phrase": "Control Plane Policing (CoPP)",
        "meaning": "QoS mechanism protecting the router's control plane by rate-limiting control plane traffic",
        "translation": "CoPP",
        "translationSv": "QoS-mekanism som skyddar routerns kontrollplan genom hastighetsbegränsning",
        "category": "techniques"
      }
    ]
  },
  {
    "id": "course4",
    "name": "Course 4 - Enterprise & Cloud",
    "categories": [
      {
        "id": "enterprise",
        "name": "Enterprise Networking",
        "color": "#42a5f5"
      },
      {
        "id": "cloud",
        "name": "Cloud & Virtualization",
        "color": "#26c6da"
      },
      {
        "id": "automation",
        "name": "Automation",
        "color": "#9ccc65"
      }
    ],
    "entries": [
      {
        "phrase": "BGP",
        "meaning": "Border Gateway Protocol - Path vector protocol holding the internet together. Uses AS-Path for loop prevention",
        "translation": "BGP",
        "translationSv": "Border Gateway Protocol - Path vector-protokoll som håller ihop internet",
        "category": "enterprise"
      },
      {
        "phrase": "Autonomous System (AS)",
        "meaning": "Collection of networks under a single administrative domain. 2-byte (1-65535) or 4-byte ASN. Private range: 64512-65535",
        "translation": "Autonomt system",
        "translationSv": "Samling nätverk under en administrativ domän",
        "category": "enterprise"
      },
      {
        "phrase": "eBGP",
        "meaning": "External BGP peering between different autonomous systems. Default TTL=1. Routes carry AS-Path information",
        "translation": "eBGP",
        "translationSv": "Extern BGP-peering mellan olika autonoma system",
        "category": "enterprise"
      },
      {
        "phrase": "iBGP",
        "meaning": "Internal BGP peering within the same autonomous system. Requires full mesh or route reflectors due to split-horizon rule",
        "translation": "iBGP",
        "translationSv": "Intern BGP-peering inom samma autonoma system",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Neighbor States",
        "meaning": "Idle, Connect, Active, OpenSent, OpenConfirm, Established. Established is the only state where routes are exchanged",
        "translation": "BGP-grannstillstånd",
        "translationSv": "BGP-grannstillstånd: Idle, Connect, Active, OpenSent, OpenConfirm, Established",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Weight",
        "meaning": "Cisco proprietary attribute. Higher weight is preferred. Local to the router, not advertised to peers",
        "translation": "BGP Weight",
        "translationSv": "Cisco-proprietär BGP-attribute. Högre vikt prioriteras",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Local Preference",
        "meaning": "Attribute used to influence outbound traffic within an AS. Higher local preference is preferred. Advertised to iBGP peers",
        "translation": "BGP Local Preference",
        "translationSv": "BGP-attribut för att påverka utgående trafik inom ett AS",
        "category": "enterprise"
      },
      {
        "phrase": "BGP AS-Path",
        "meaning": "Attribute listing all AS numbers a route has traversed. Shorter AS-Path is preferred. Used for loop prevention",
        "translation": "BGP AS-Path",
        "translationSv": "BGP-attribut som listar alla AS-nummer en väg har passerat",
        "category": "enterprise"
      },
      {
        "phrase": "BGP MED",
        "meaning": "Multi-Exit Discriminator - metric suggesting the preferred entry point into an AS. Lower MED is preferred",
        "translation": "BGP MED",
        "translationSv": "Multi-Exit Discriminator - metrik som föreslår föredragen ingångspunkt till ett AS",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Path Selection",
        "meaning": "Algorithm order: Weight > Local Pref > Originate > AS-Path > Origin > MED > eBGP > IGP metric > Router ID",
        "translation": "BGP-vägval",
        "translationSv": "BGP-algoritm för vägval: Weight > Local Pref > AS-Path > MED > eBGP > IGP-metric",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Route Reflector",
        "meaning": "Solution to iBGP split-horizon by allowing route reflection to iBGP peers, eliminating the need for full mesh",
        "translation": "BGP Route Reflector",
        "translationSv": "Lösning på iBGP split-horizon genom att tillåta route-reflektion till iBGP-grannar",
        "category": "enterprise"
      },
      {
        "phrase": "802.11 Standards",
        "meaning": "Wi-Fi standards: a (5GHz, 54Mbps), b (2.4GHz, 11Mbps), g (2.4GHz, 54Mbps), n (dual-band, MIMO), ac (5GHz, Wave 1/2), ax/Wi-Fi 6, be/Wi-Fi 7",
        "translation": "802.11-standarder",
        "translationSv": "Wi-Fi-standarder: a, b, g, n, ac, ax (Wi-Fi 6), be (Wi-Fi 7)",
        "category": "enterprise"
      },
      {
        "phrase": "CAPWAP",
        "meaning": "Control and Provisioning of Wireless Access Points - protocol between lightweight APs and WLC. Splits control (UDP 5246) and data (UDP 5247)",
        "translation": "CAPWAP",
        "translationSv": "Protokoll mellan lightweight-AP och WLC. Delar kontroll- och dataplan",
        "category": "enterprise"
      },
      {
        "phrase": "WPA3 SAE",
        "meaning": "Simultaneous Authentication of Equals - WPA3 handshake replacing WPA2-PSK. Provides forward secrecy and protects against dictionary attacks",
        "translation": "WPA3 SAE",
        "translationSv": "WPA3-handskakning som ersätter WPA2-PSK. Ger framtida sekretess och skydd mot ordboksattacker",
        "category": "enterprise"
      },
      {
        "phrase": "Leaf-Spine Architecture",
        "meaning": "Data center topology where every leaf switch connects to every spine switch. Provides predictable latency, easy scalability, and non-blocking bandwidth",
        "translation": "Leaf-Spine-arkitektur",
        "translationSv": "Datacentertopologi där varje leaf-switch ansluts till varje spine-switch",
        "category": "enterprise"
      },
      {
        "phrase": "Border Leaf",
        "meaning": "Specialized leaf switch connecting the data center fabric to external networks (WAN, internet) while maintaining leaf-spine principles",
        "translation": "Border Leaf",
        "translationSv": "Specialiserad leaf-switch som ansluter datacenterfabriken till externa nätverk",
        "category": "enterprise"
      },
      {
        "phrase": "VXLAN",
        "meaning": "Virtual Extensible LAN - overlay protocol encapsulating L2 frames in UDP (port 4789). Uses 24-bit VNI (16M segments) and VTEP endpoints",
        "translation": "VXLAN",
        "translationSv": "Virtual Extensible LAN - overlay-protokoll som kapslar in L2-ramar i UDP",
        "category": "cloud"
      },
      {
        "phrase": "VTEP",
        "meaning": "VXLAN Tunnel Endpoint - device performing VXLAN encapsulation and decapsulation. Can be a physical switch, software switch, or hypervisor",
        "translation": "VTEP",
        "translationSv": "VXLAN Tunnel Endpoint - enhet som utför VXLAN-inkapsling och avkapsling",
        "category": "cloud"
      },
      {
        "phrase": "EVPN",
        "meaning": "Ethernet VPN - control plane for VXLAN using BGP to distribute MAC/VTEP information across the fabric",
        "translation": "EVPN",
        "translationSv": "Ethernet VPN - kontrollplan för VXLAN med BGP för MAC/VTEP-distribution",
        "category": "cloud"
      },
      {
        "phrase": "Virtual Switch (vSwitch)",
        "meaning": "Software-based switch running on a hypervisor to connect virtual machines to the physical network",
        "translation": "Virtuell switch",
        "translationSv": "Programvarubaserad switch på en hypervisor för att ansluta virtuella maskiner till det fysiska nätverket",
        "category": "cloud"
      },
      {
        "phrase": "SR-IOV",
        "meaning": "Single Root I/O Virtualization - hardware feature allowing a VM to bypass the vSwitch and directly access a physical NIC for near-native performance",
        "translation": "SR-IOV",
        "translationSv": "Hårdvarufunktion som låter en VM direktaccessa ett fysiskt nätverkskort för nära-native-prestanda",
        "category": "cloud"
      },
      {
        "phrase": "NFV",
        "meaning": "Network Function Virtualization - running network functions (firewalls, routers, load balancers) as software on standard servers",
        "translation": "NFV",
        "translationSv": "Network Function Virtualization - nätverksfunktioner som programvara på standardservrar",
        "category": "cloud"
      },
      {
        "phrase": "HSRP",
        "meaning": "Hot Standby Router Protocol - Cisco FHRP providing active/standby gateway redundancy. Virtual IP shared between routers",
        "translation": "HSRP",
        "translationSv": "Hot Standby Router Protocol - Cisco FHRP med aktiv/standby gateway-redundans",
        "category": "enterprise"
      },
      {
        "phrase": "VRRP",
        "meaning": "Virtual Router Redundancy Protocol - open standard FHRP for gateway redundancy. Master/backup with virtual IP",
        "translation": "VRRP",
        "translationSv": "Virtual Router Redundancy Protocol - öppen standard FHRP för gateway-redundans",
        "category": "enterprise"
      },
      {
        "phrase": "GLBP",
        "meaning": "Gateway Load Balancing Protocol - Cisco FHRP providing load balancing across multiple gateways with a single virtual IP",
        "translation": "GLBP",
        "translationSv": "Gateway Load Balancing Protocol - Cisco FHRP som lastbalanserar över flera gateways",
        "category": "enterprise"
      },
      {
        "phrase": "LACP (802.3ad)",
        "meaning": "Link Aggregation Control Protocol - bundles multiple physical links into a single logical link for increased bandwidth and redundancy",
        "translation": "LACP",
        "translationSv": "Link Aggregation Control Protocol - buntar flera fysiska länkar till en logisk länk",
        "category": "enterprise"
      },
      {
        "phrase": "vPC",
        "meaning": "Virtual Port Channel - Cisco multi-chassis link aggregation allowing a port channel to span two upstream switches",
        "translation": "vPC",
        "translationSv": "Virtual Port Channel - Cisco multi-chassis länkaggregering över två switchar",
        "category": "enterprise"
      },
      {
        "phrase": "DiffServ",
        "meaning": "Differentiated Services - scalable QoS model marking packets with DSCP (6 bits) at the edge for per-hop behavior treatment in the core",
        "translation": "DiffServ",
        "translationSv": "Differentiated Services - skalbar QoS-modell med DSCP-märkning",
        "category": "enterprise"
      },
      {
        "phrase": "DSCP",
        "meaning": "Differentiated Services Code Point - 6-bit field in IP header for QoS marking. Values: EF (46), AF41 (34), AF31 (26), AF21 (18), CS0-7",
        "translation": "DSCP",
        "translationSv": "Differentiated Services Code Point - 6-bitars fält i IP-headern för QoS-märkning",
        "category": "enterprise"
      },
      {
        "phrase": "LLQ",
        "meaning": "Low Latency Queuing - QoS queuing mechanism providing a strict priority queue for delay-sensitive traffic (voice) with bandwidth guarantees for other queues",
        "translation": "LLQ",
        "translationSv": "Low Latency Queuing - QoS-kömekanism med strikt prioritetskö för fördröjningskänslig trafik",
        "category": "enterprise"
      },
      {
        "phrase": "CBWFQ",
        "meaning": "Class-Based Weighted Fair Queuing - QoS mechanism providing per-class bandwidth guarantees using user-defined traffic classes",
        "translation": "CBWFQ",
        "translationSv": "Class-Based Weighted Fair Queuing - QoS-mekanism med bandbreddsgarantier per klass",
        "category": "enterprise"
      },
      {
        "phrase": "Traffic Shaping",
        "meaning": "QoS technique buffering excess traffic to smooth out bursts and ensure compliance with configured rate limits",
        "translation": "Trafikformning",
        "translationSv": "QoS-teknik som buffrar överskottstrafik för att jämna ut trafiktoppar",
        "category": "enterprise"
      },
      {
        "phrase": "Traffic Policing",
        "meaning": "QoS technique dropping or re-marking excess traffic that exceeds a configured rate. Uses single/two-rate, three-color marker",
        "translation": "Trafikpolis",
        "translationSv": "QoS-teknik som släpper eller omärker överskottstrafik",
        "category": "enterprise"
      },
      {
        "phrase": "YANG",
        "meaning": "Yet Another Next Generation - data modeling language for network device configuration and state, used by NETCONF/RESTCONF",
        "translation": "YANG",
        "translationSv": "Yet Another Next Generation - datamodelleringsspråk för nätverksenhetskonfiguration",
        "category": "automation"
      },
      {
        "phrase": "NETCONF",
        "meaning": "Network Configuration Protocol using SSH (port 830) and XML-encoded YANG data models for device configuration and management",
        "translation": "NETCONF",
        "translationSv": "Nätverkskonfigurationsprotokoll med SSH och XML-kodade YANG-datamodeller",
        "category": "automation"
      },
      {
        "phrase": "RESTCONF",
        "meaning": "Stateless RESTful API using HTTP/HTTPS for network device configuration. Supports JSON and XML with YANG data models",
        "translation": "RESTCONF",
        "translationSv": "Tillståndslöst RESTful API med HTTP/HTTPS för nätverksenhetskonfiguration",
        "category": "automation"
      },
      {
        "phrase": "Ansible",
        "meaning": "Agentless automation tool using YAML playbooks and SSH for network device configuration management and orchestration",
        "translation": "Ansible",
        "translationSv": "Agentlöst automatiseringsverktyg med YAML-playbooks och SSH för nätverkskonfiguration",
        "category": "automation"
      },
      {
        "phrase": "Terraform",
        "meaning": "Infrastructure as Code tool for provisioning and managing network infrastructure across multiple providers declaratively",
        "translation": "Terraform",
        "translationSv": "Infrastructure as Code-verktyg för deklarativ provisionering av nätverksinfrastruktur",
        "category": "automation"
      },
      {
        "phrase": "netmiko",
        "meaning": "Python library simplifying SSH connections to network devices. Multi-vendor support with consistent interface",
        "translation": "netmiko",
        "translationSv": "Python-bibliotek för SSH-anslutning till nätverksenheter med flera leverantörer",
        "category": "automation"
      },
      {
        "phrase": "napalm",
        "meaning": "Network Automation and Programmability Abstraction Layer with Multi-vendor support - Python library providing consistent API across network OS types",
        "translation": "napalm",
        "translationSv": "Python-bibliotek med konsekvent API över olika nätverks-OS",
        "category": "automation"
      },
      {
        "phrase": "SD-WAN",
        "meaning": "Software-Defined WAN - architecture separating control plane from data plane. Centralized orchestration with intelligent path selection across multiple transports",
        "translation": "SD-WAN",
        "translationSv": "Programvarudefinierat WAN - arkitektur som separerar kontrollplan från dataplan",
        "category": "enterprise"
      },
      {
        "phrase": "SD-WAN Data Plane",
        "meaning": "Forwarding plane handling packet processing, encapsulation, and traffic forwarding across overlay tunnels between edge devices",
        "translation": "SD-WAN-dataplan",
        "translationSv": "Vidarebefordringsplan för paketprocessning och trafiköverföring över overlay-tunnlar",
        "category": "enterprise"
      },
      {
        "phrase": "SD-WAN Control Plane",
        "meaning": "Centralized or distributed plane managing routing, policies, and path selection decisions. Separated from data plane for flexibility",
        "translation": "SD-WAN-kontrollplan",
        "translationSv": "Centraliserat eller distribuerat plan för routing, policyer och vägval",
        "category": "enterprise"
      },
      {
        "phrase": "SD-WAN Orchestrator",
        "meaning": "Central management component for zero-touch provisioning, policy distribution, monitoring, and analytics across the SD-WAN fabric",
        "translation": "SD-WAN-orkestrator",
        "translationSv": "Central hanteringskomponent för zero-touch-provisionering och policy-distribution",
        "category": "enterprise"
      },
      {
        "phrase": "SASE",
        "meaning": "Secure Access Service Edge - converged cloud-native architecture combining SD-WAN with cloud security functions (SWG, CASB, FWaaS, ZTNA)",
        "translation": "SASE",
        "translationSv": "Secure Access Service Edge - konvergerad molnbaserad arkitektur som kombinerar SD-WAN med molnsäkerhet",
        "category": "enterprise"
      },
      {
        "phrase": "ZTNA",
        "meaning": "Zero Trust Network Access - security model granting access based on identity and context, not network location. Replaces traditional VPN",
        "translation": "ZTNA",
        "translationSv": "Zero Trust Network Access - säkerhetsmodell som ger åtkomst baserat på identitet och kontext, inte nätverksposition",
        "category": "enterprise"
      }
    ]
  },
  {
    "id": "course5",
    "name": "Course 5 - Communication & Documentation",
    "categories": [
      {
        "id": "communication",
        "name": "Communication & Documentation",
        "color": "#ff7043"
      }
    ],
    "entries": [
      {
        "phrase": "Technical Report Writing",
        "meaning": "A technical report is a formal document that describes a technical project, analysis, or investigation in a structured, objective manner.",
        "translation": "Teknisk Rapport",
        "translationSv": "En teknisk rapport är ett formellt dokument som beskriver.",
        "category": "communication"
      },
      {
        "phrase": "Presentation Technique",
        "meaning": "Effective presentations communicate technical information to diverse audiences, adapting content, language, and delivery style to match the audience's background and expectations.",
        "translation": "Presentationsteknik",
        "translationSv": "Presentation av nätverkslösningar är en viktig.",
        "category": "communication"
      },
      {
        "phrase": "Documentation Standards",
        "meaning": "Documentation standards ensure consistency, quality, and maintainability of technical documentation across an organization.",
        "translation": "Dokumentationsstandarder",
        "translationSv": "Dokumentationsstandarder säkerställer konsekvens och.",
        "category": "communication"
      },
      {
        "phrase": "Requirements Specification",
        "meaning": "Requirements gathering is the first and most critical phase of any network project, defining the scope, objectives, and constraints before any design or implementation work begins.",
        "translation": "Kravspecifikation",
        "translationSv": "Kravinsamling (requirements gathering) är den första och.",
        "category": "communication"
      },
      {
        "phrase": "Agile Communication",
        "meaning": "Agile communication adapts communication styles and practices to support iterative, collaborative work methods like Scrum and Kanban.",
        "translation": "Agil Kommunikation",
        "translationSv": "Agil kommunikation handlar om att anpassa.",
        "category": "communication"
      },
      {
        "phrase": "Visual Communication",
        "meaning": "Visual communication uses diagrams, images, charts, and other visual elements to convey technical information more effectively than text alone.",
        "translation": "Visuell Kommunikation",
        "translationSv": "Visuell kommunikation använder bilder, diagram och grafer.",
        "category": "communication"
      }
    ]
  },
  {
    "id": "course6",
    "name": "Course 6 - Project Management",
    "categories": [
      {
        "id": "management",
        "name": "Project Management",
        "color": "#5c6bc0"
      }
    ],
    "entries": [
      {
        "phrase": "Project Lifecycle",
        "meaning": "A project lifecycle describes phases from initiation to closure.",
        "translation": "Projektlivscykeln",
        "translationSv": "En projektlivscykel beskriver de faser ett projekt.",
        "category": "management"
      },
      {
        "phrase": "Scrum Framework",
        "meaning": "Scrum is an agile framework for managing complex projects with iterative sprints.",
        "translation": "Scrum-ramverket",
        "translationSv": "Scrum är ett agilt ramverk för att hantera komplexa projekt, inklusive nätverksprojekt.",
        "category": "management"
      },
      {
        "phrase": "Project Planning",
        "meaning": "Project planning defines scope, schedule, budget, and resources for a network project.",
        "translation": "Projektplanering",
        "translationSv": "Projektplanering är processen att definiera projektets.",
        "category": "management"
      },
      {
        "phrase": "Risk Management",
        "meaning": "Risk management identifies, analyzes, and responds to project risks.",
        "translation": "Riskhantering",
        "translationSv": "Riskhantering (risk management) är processen att.",
        "category": "management"
      },
      {
        "phrase": "Kanban Method",
        "meaning": "Kanban visualizes work, limits WIP, and optimizes flow.",
        "translation": "Kanban-metoden",
        "translationSv": "Kanban är ett agilt ramverk som fokuserar på att visualisera arbete, begränsa pågående arbete (WIP-limits) och optimera flödet.",
        "category": "management"
      },
      {
        "phrase": "Team Dynamics",
        "meaning": "Team dynamics describes social and psychological factors influencing team performance.",
        "translation": "Teamdynamik",
        "translationSv": "Teamdynamik (team dynamics) beskriver de psykologiska och.",
        "category": "management"
      },
      {
        "phrase": "Requirements Engineering",
        "meaning": "Requirements Engineering systematically identifies, analyzes, documents, and validates requirements.",
        "translation": "Requirements Engineering (kravhantering)",
        "translationSv": "Requirements Engineering (RE) är den systematiska processen att identifiera, analysera, dokumentera och hantera krav.",
        "category": "management"
      },
      {
        "phrase": "Quality Assurance",
        "meaning": "Quality Assurance prevents defects through systematic activities in network projects.",
        "translation": "Kvalitetssäkring",
        "translationSv": "Kvalitetssäkring (Quality Assurance, QA) är en proaktiv.",
        "category": "management"
      }
    ]
  },
  {
    "id": "course7",
    "name": "Course 7 - Operations & Security",
    "categories": [
      {
        "id": "operations",
        "name": "Operations & Security",
        "color": "#8d6e63"
      }
    ],
    "entries": [
      {
        "phrase": "Network Device Management",
        "meaning": "Network device management covers monitoring, configuration, and maintenance.",
        "translation": "Nätverksenhetshantering",
        "translationSv": "SNMP (Simple Network Management Protocol) är.",
        "category": "operations"
      },
      {
        "phrase": "Configuration Management",
        "meaning": "Configuration Management systematically handles network device configurations.",
        "translation": "Konfigurationshantering",
        "translationSv": "Configuration Management (CM) är processen att systematiskt hantera nätverksenheters konfigurationer genom hela deras livscykel.",
        "category": "operations"
      },
      {
        "phrase": "Network Monitoring",
        "meaning": "Network monitoring continuously observes devices and traffic for health, performance, and security.",
        "translation": "Nätverksövervakning",
        "translationSv": "Nätverksövervakning (network monitoring) är processen.",
        "category": "operations"
      },
      {
        "phrase": "Troubleshooting",
        "meaning": "Troubleshooting systematically identifies, diagnoses, and resolves network problems.",
        "translation": "Felsökning",
        "translationSv": "Nätverksfelsökning (troubleshooting) är den systematiska.",
        "category": "operations"
      },
      {
        "phrase": "Hardware Installation",
        "meaning": "Network hardware installation requires careful planning and standards compliance.",
        "translation": "Hårdvaruinstallation",
        "translationSv": "Installation av nätverkshårdvara kräver noggrann.",
        "category": "operations"
      },
      {
        "phrase": "Operations Documentation",
        "meaning": "Operations documentation ensures continuity and knowledge transfer for daily network operations.",
        "translation": "Driftdokumentation",
        "translationSv": "Operativ dokumentation (operations documentation) är den.",
        "category": "operations"
      },
      {
        "phrase": "SIEM and Security Monitoring",
        "meaning": "SIEM (Security Information and Event Management) is a centralized platform that collects, analyzes, and correlates log data from across an organization's IT environment to detect security incidents in real time and suppo",
        "translation": "SIEM och säkerhetsövervakning",
        "translationSv": "SIEM (Security Information and Event Management) är en centraliserad plattform som samlar in, analyserar och korrelerar loggdata från hela organisationens IT-miljö för att upptäcka säkerhetsincidenter i realtid och stödj",
        "category": "operations"
      },
      {
        "phrase": "Cloud Security and CASB",
        "meaning": "As organizations migrate to the cloud, the security model shifts dramatically.",
        "translation": "Moln- och applikationssäkerhet (CASB och SASE)",
        "translationSv": "När organisationer migrerar till molnet förändras säkerhetsmodellen dramatiskt.",
        "category": "operations"
      }
    ]
  },
  {
    "id": "course_linux",
    "name": "Module A - Linux Administration",
    "categories": [
      {
        "id": "linux",
        "name": "Linux Fundamentals",
        "color": "#78909c"
      }
    ],
    "entries": [
      {
        "phrase": "Linux File System Hierarchy",
        "meaning": "Directory structure: /etc (config), /var (logs), /usr (programs), /home (users), /dev (devices), /proc (process info)",
        "translation": "Linux-filsystemshierarki",
        "translationSv": "Katalogstruktur: /etc (konfig), /var (loggar), /usr (program), /home (användare), /dev (enheter), /proc (processinfo)",
        "category": "linux"
      },
      {
        "phrase": "chmod",
        "meaning": "Command to change file permissions. Octal: r=4, w=2, x=1. Symbolic: u/g/o/a + rwx",
        "translation": "chmod",
        "translationSv": "Kommando för att ändra filrättigheter",
        "category": "linux"
      },
      {
        "phrase": "SUID Bit",
        "meaning": "Special permission bit allowing a file to execute with the owner's privileges. Set with chmod u+s. Displayed as 's' in owner execute position",
        "translation": "SUID-bit",
        "translationSv": "Speciell rättighetsbit som kör en fil med ägarens privilegier",
        "category": "linux"
      },
      {
        "phrase": "umask",
        "meaning": "Default permission mask removing permissions from new files/directories. Default umask 022 gives 755 for directories, 644 for files",
        "translation": "umask",
        "translationSv": "Standardrättighetsmask för nya filer/kataloger",
        "category": "linux"
      },
      {
        "phrase": "systemctl",
        "meaning": "Command to control systemd services. Common: start, stop, restart, enable, disable, status, daemon-reload",
        "translation": "systemctl",
        "translationSv": "Kommando för att kontrollera systemd-tjänster",
        "category": "linux"
      },
      {
        "phrase": "Bash I/O Redirection",
        "meaning": "> (redirect stdout), >> (append), 2> (redirect stderr), &> (redirect both), < (input), | (pipe between commands)",
        "translation": "Bash I/O-omdirigering",
        "translationSv": "Bash-kommandon för I/O-omdirigering",
        "category": "linux"
      },
      {
        "phrase": "grep",
        "meaning": "Command-line text search tool. Common: -i (ignore case), -r (recursive), -v (invert match), -E (extended regex)",
        "translation": "grep",
        "translationSv": "Kommandoradsverktyg för textsökning",
        "category": "linux"
      },
      {
        "phrase": "awk",
        "meaning": "Text processing language for field-based extraction and reporting. Default field separator is whitespace",
        "translation": "awk",
        "translationSv": "Textbehandlingsspråk för fältbaserad extraktion och rapportering",
        "category": "linux"
      },
      {
        "phrase": "sed",
        "meaning": "Stream editor for text transformation. Common: s/old/new/g (substitute), /pattern/d (delete lines)",
        "translation": "sed",
        "translationSv": "Strömredigerare för textomvandling",
        "category": "linux"
      }
    ]
  },
  {
    "id": "course_hardware",
    "name": "Module B - Hardware & A+",
    "categories": [
      {
        "id": "hardware",
        "name": "Hardware",
        "color": "#8d6e63"
      }
    ],
    "entries": [
      {
        "phrase": "RAID 0",
        "meaning": "Striping - data split across disks. Performance gain, no redundancy. Failure of one disk loses all data",
        "translation": "RAID 0",
        "translationSv": "Striping - data delas över diskar. Prestandavinst, ingen redundans",
        "category": "hardware"
      },
      {
        "phrase": "RAID 1",
        "meaning": "Mirroring - identical data on two disks. Redundancy, 50% capacity loss",
        "translation": "RAID 1",
        "translationSv": "Spegling - identisk data på två diskar. Redundans, 50% kapacitetsförlust",
        "category": "hardware"
      },
      {
        "phrase": "RAID 5",
        "meaning": "Striping with distributed parity. Requires minimum 3 disks. Single disk fault tolerance",
        "translation": "RAID 5",
        "translationSv": "Striping med distribuerad paritet. Minst 3 diskar. Tål en disks fel",
        "category": "hardware"
      },
      {
        "phrase": "RAID 10",
        "meaning": "Striped mirror set - combines RAID 0 and RAID 1. Minimum 4 disks. Tolerates multiple disk failures with proper configuration",
        "translation": "RAID 10",
        "translationSv": "Striped mirror set - kombinerar RAID 0 och RAID 1",
        "category": "hardware"
      },
      {
        "phrase": "NVMe",
        "meaning": "Non-Volatile Memory Express - high-performance storage protocol over PCIe. Lower latency and higher IOPS vs SATA/SAS",
        "translation": "NVMe",
        "translationSv": "Non-Volatile Memory Express - högpresterande lagringsprotokoll över PCIe",
        "category": "hardware"
      },
      {
        "phrase": "CompTIA 6-Step Troubleshooting",
        "meaning": "1. Identify problem, 2. Establish theory of probable cause, 3. Test theory, 4. Plan of action, 5. Verify functionality, 6. Document findings",
        "translation": "CompTIA 6-stegs felsökning",
        "translationSv": "CompTIA 6-stegs felsökningsprocess",
        "category": "hardware"
      }
    ]
  },
  {
    "id": "all_terms",
    "name": "All Extracted Terms",
    "categories": [
      {
        "id": "fundamentals",
        "name": "Fundamentals",
        "color": "#4fc3f7"
      },
      {
        "id": "protocols",
        "name": "Protocols & Addressing",
        "color": "#66bb6a"
      },
      {
        "id": "switching",
        "name": "Switching",
        "color": "#ab47bc"
      },
      {
        "id": "routing",
        "name": "Routing",
        "color": "#ffa726"
      },
      {
        "id": "config",
        "name": "Configuration",
        "color": "#26a69a"
      },
      {
        "id": "techniques",
        "name": "Security Techniques",
        "color": "#ef5350"
      },
      {
        "id": "threats",
        "name": "Threats & Attacks",
        "color": "#ff7043"
      },
      {
        "id": "enterprise",
        "name": "Enterprise Networking",
        "color": "#42a5f5"
      },
      {
        "id": "cloud",
        "name": "Cloud & Virtualization",
        "color": "#26c6da"
      },
      {
        "id": "automation",
        "name": "Automation",
        "color": "#9ccc65"
      },
      {
        "id": "linux",
        "name": "Linux Fundamentals",
        "color": "#78909c"
      },
      {
        "id": "hardware",
        "name": "Hardware",
        "color": "#8d6e63"
      }
    ],
    "entries": [
      {
        "phrase": "# Assign an IP to the bridge interface",
        "meaning": "# Start dnsmasq , bound to the bridge sudo dnsmasq --interface=ovs -br0 \\ --dhcp -range =192.168.100.10 ,192.168.100.100 ,12h \\ -- bind -interfaces “Now verify your work:” # Confirm the IP is assigned to the bridge ip addr show ovs -br0",
        "translation": "",
        "translationSv": "",
        "category": "protocols"
      },
      {
        "phrase": "# Confirm dnsmasq is running",
        "meaning": "# Confirm it listens on port 67 (DHCP) sudo ss -ulnp | grep :67 “Within your Alpine VM, request an address:” udhcpc -i eth0 ip addr show eth0 ping 192.168.100.1 When Silence Persists “If the VM still receives no address,” said the master, “observe the network’s whispers:”",
        "translation": "",
        "translationSv": "",
        "category": "protocols"
      },
      {
        "phrase": "# Confirm it listens on port 67 (DHCP)",
        "meaning": "“Within your Alpine VM, request an address:” udhcpc -i eth0 ip addr show eth0 ping 192.168.100.1 When Silence Persists “If the VM still receives no address,” said the master, “observe the network’s whispers:”",
        "translation": "",
        "translationSv": "",
        "category": "protocols"
      },
      {
        "phrase": "# Create a bridge",
        "meaning": "# Verify creation sudo ovs -vsctl show “The bridge now exists, but it is empty—a switch with no ports connected. Virtual machines must be attached to it.” The Lesson Open vSwitch requires two services: ovsdb-server (the configuration database) and ovs-vswitchd (the switch daemon). The ovs-vsctl command is the primary tool for managing bridges, ports, and configuration. A newly created bridge has no ports until VMs or interfaces are explicitly added.",
        "translation": "",
        "translationSv": "",
        "category": "techniques"
      },
      {
        "phrase": "# Install Open vSwitch",
        "meaning": "# Enable and start the services sudo systemctl enable --now ovs -vswitchd ovsdb -server # Create a bridge sudo ovs -vsctl add -br ovs -br0 # Verify creation sudo ovs -vsctl show “The bridge now exists, but it is empty—a switch with no ports connected. Virtual machines must be attached to it.”",
        "translation": "",
        "translationSv": "",
        "category": "hardware"
      },
      {
        "phrase": "# On the Arch host , install dnsmasq",
        "meaning": "# Assign an IP to the bridge interface sudo ip addr add 192.168.100.1/24 dev ovs -br0 # Start dnsmasq , bound to the bridge sudo dnsmasq --interface=ovs -br0 \\ --dhcp -range =192.168.100.10 ,192.168.100.100 ,12h \\ -- bind -interfaces",
        "translation": "",
        "translationSv": "",
        "category": "protocols"
      },
      {
        "phrase": "# On the host , watch DHCP traffic",
        "meaning": "“Then run udhcpc in the VM. If you see DISCOVER packets but no OFFER, dnsmasq is not responding. If you see nothing, traffic is not reaching the bridge—the virtualport configuration may be incorrect.”",
        "translation": "",
        "translationSv": "",
        "category": "protocols"
      },
      {
        "phrase": "# Start dnsmasq , bound to the bridge",
        "meaning": "“Now verify your work:” # Confirm the IP is assigned to the bridge ip addr show ovs -br0 # Confirm dnsmasq is running ps aux | grep dnsmasq # Confirm it listens on port 67 (DHCP) sudo ss -ulnp | grep :67",
        "translation": "",
        "translationSv": "",
        "category": "protocols"
      },
      {
        "phrase": "7 5 4 3 2 1",
        "meaning": "Portnummer IP-adress MAC-adress",
        "translation": "Data Segment Paket Ram (Frame) Bitar",
        "translationSv": "",
        "category": "protocols"
      },
      {
        "phrase": "802.11 Standards",
        "meaning": "Wi-Fi standards: a (5GHz, 54Mbps), b (2.4GHz, 11Mbps), g (2.4GHz, 54Mbps), n (dual-band, MIMO), ac (5GHz, Wave 1/2), ax/Wi-Fi 6, be/Wi-Fi 7",
        "translation": "802.11-standarder",
        "translationSv": "Wi-Fi-standarder: a, b, g, n, ac, ax (Wi-Fi 6), be (Wi-Fi 7)",
        "category": "enterprise"
      },
      {
        "phrase": "802.1Q VLAN Tag",
        "meaning": "4-byte tag inserted into Ethernet frame: TPID (2 bytes), PCP (3 bits), DEI (1 bit), VID (12 bits). Supports VLANs 1-4094",
        "translation": "802.1Q VLAN-tagg",
        "translationSv": "4-byte-tagg i Ethernet-ram: TPID, PCP, DEI, VID. Stöder VLAN 1-4094",
        "category": "switching"
      },
      {
        "phrase": "802.1X",
        "meaning": "Network access control standard using three roles: Supplicant (client), Authenticator (switch/AP), Authentication Server (RADIUS)",
        "translation": "802.1X",
        "translationSv": "Nätverksaccesskontrollstandard med tre roller: Supplicant, Authenticator, Authentication Server",
        "category": "techniques"
      },
      {
        "phrase": "AAA Framework",
        "meaning": "Authentication (who you are), Authorization (what you can do), Accounting (what you did)",
        "translation": "AAA-ramverk",
        "translationSv": "Autentisering (vem du är), Auktorisation (vad du får göra), Redovisning (vad du gjorde)",
        "category": "techniques"
      },
      {
        "phrase": "Access Port",
        "meaning": "Switch port assigned to a single VLAN. Traffic is untagged (no 802.1Q header)",
        "translation": "Accessport",
        "translationSv": "Switchport tilldelad ett enda VLAN. Trafik är otaggad (ingen 802.1Q-header)",
        "category": "switching"
      },
      {
        "phrase": "Administrative Distance (AD)",
        "meaning": "Trustworthiness rating of a routing source. Lower AD = more trusted. Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120",
        "translation": "Administrativt avstånd",
        "translationSv": "Trovärdighetsbetyg för en routingkälla. Lägre AD = mer pålitlig",
        "category": "routing"
      },
      {
        "phrase": "Ansible",
        "meaning": "Agentless automation tool using YAML playbooks and SSH for network device configuration management and orchestration",
        "translation": "Ansible",
        "translationSv": "Agentlöst automatiseringsverktyg med YAML-playbooks och SSH för nätverkskonfiguration",
        "category": "automation"
      },
      {
        "phrase": "APIPA/Link-Local",
        "meaning": "169.254.0.0/16 range automatically assigned when DHCP fails to provide an IP address",
        "translation": "APIPA/Länk-lokal",
        "translationSv": "169.254.0.0/16-intervall som tilldelas automatiskt när DHCP inte kan ge en IP-adress",
        "category": "protocols"
      },
      {
        "phrase": "ARP Poisoning",
        "meaning": "Man-in-the-middle attack sending forged ARP messages to associate an attacker's MAC with a victim's IP address",
        "translation": "ARP-förgiftning",
        "translationSv": "Man-in-the-middle-attack med förfalskade ARP-meddelanden",
        "category": "threats"
      },
      {
        "phrase": "ARP Reply",
        "meaning": "Unicast response to an ARP request containing the requested MAC address",
        "translation": "ARP-svar",
        "translationSv": "Unicast-svar på en ARP-förfrågan som innehåller den begärda MAC-adressen",
        "category": "protocols"
      },
      {
        "phrase": "ARP Request",
        "meaning": "Broadcast frame sent to discover the MAC address associated with a given IP address",
        "translation": "ARP-förfrågan",
        "translationSv": "Broadcast-ram som skickas för att upptäcka MAC-adressen kopplad till en given IP-adress",
        "category": "protocols"
      },
      {
        "phrase": "Asymmetric Encryption",
        "meaning": "Encryption using a public-private key pair. Examples: RSA, ECC. Slower but solves key distribution",
        "translation": "Asymmetrisk kryptering",
        "translationSv": "Kryptering med ett publik-privat nyckelpar",
        "category": "techniques"
      },
      {
        "phrase": "Attenuation",
        "meaning": "Signal strength loss over distance due to resistance, scattering, and absorption in the transmission medium",
        "translation": "Dämpning",
        "translationSv": "Signalförlust över avstånd på grund av resistans, spridning och absorption i överföringsmediet",
        "category": "fundamentals"
      },
      {
        "phrase": "Auto-negotiation",
        "meaning": "Protocol allowing devices to automatically exchange speed and duplex capabilities over a link",
        "translation": "Automatisk förhandling",
        "translationSv": "Protokoll som tillåter enheter att automatiskt utbyta hastighets- och duplexkapacitet över en länk",
        "category": "fundamentals"
      },
      {
        "phrase": "Autonomous System (AS)",
        "meaning": "Collection of networks under a single administrative domain. 2-byte (1-65535) or 4-byte ASN. Private range: 64512-65535",
        "translation": "Autonomt system",
        "translationSv": "Samling nätverk under en administrativ domän",
        "category": "enterprise"
      },
      {
        "phrase": "awk",
        "meaning": "Text processing language for field-based extraction and reporting. Default field separator is whitespace",
        "translation": "awk",
        "translationSv": "Textbehandlingsspråk för fältbaserad extraktion och rapportering",
        "category": "linux"
      },
      {
        "phrase": "Bash I/O Redirection",
        "meaning": "> (redirect stdout), >> (append), 2> (redirect stderr), &> (redirect both), < (input), | (pipe between commands)",
        "translation": "Bash I/O-omdirigering",
        "translationSv": "Bash-kommandon för I/O-omdirigering",
        "category": "linux"
      },
      {
        "phrase": "BGP",
        "meaning": "Border Gateway Protocol - Path vector protocol holding the internet together. Uses AS-Path for loop prevention",
        "translation": "BGP",
        "translationSv": "Border Gateway Protocol - Path vector-protokoll som håller ihop internet",
        "category": "enterprise"
      },
      {
        "phrase": "BGP AS-Path",
        "meaning": "Attribute listing all AS numbers a route has traversed. Shorter AS-Path is preferred. Used for loop prevention",
        "translation": "BGP AS-Path",
        "translationSv": "BGP-attribut som listar alla AS-nummer en väg har passerat",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Local Preference",
        "meaning": "Attribute used to influence outbound traffic within an AS. Higher local preference is preferred. Advertised to iBGP peers",
        "translation": "BGP Local Preference",
        "translationSv": "BGP-attribut för att påverka utgående trafik inom ett AS",
        "category": "enterprise"
      },
      {
        "phrase": "BGP MED",
        "meaning": "Multi-Exit Discriminator - metric suggesting the preferred entry point into an AS. Lower MED is preferred",
        "translation": "BGP MED",
        "translationSv": "Multi-Exit Discriminator - metrik som föreslår föredragen ingångspunkt till ett AS",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Neighbor States",
        "meaning": "Idle, Connect, Active, OpenSent, OpenConfirm, Established. Established is the only state where routes are exchanged",
        "translation": "BGP-grannstillstånd",
        "translationSv": "BGP-grannstillstånd: Idle, Connect, Active, OpenSent, OpenConfirm, Established",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Path Selection",
        "meaning": "Algorithm order: Weight > Local Pref > Originate > AS-Path > Origin > MED > eBGP > IGP metric > Router ID",
        "translation": "BGP-vägval",
        "translationSv": "BGP-algoritm för vägval: Weight > Local Pref > AS-Path > MED > eBGP > IGP-metric",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Route Reflector",
        "meaning": "Solution to iBGP split-horizon by allowing route reflection to iBGP peers, eliminating the need for full mesh",
        "translation": "BGP Route Reflector",
        "translationSv": "Lösning på iBGP split-horizon genom att tillåta route-reflektion till iBGP-grannar",
        "category": "enterprise"
      },
      {
        "phrase": "BGP Weight",
        "meaning": "Cisco proprietary attribute. Higher weight is preferred. Local to the router, not advertised to peers",
        "translation": "BGP Weight",
        "translationSv": "Cisco-proprietär BGP-attribute. Högre vikt prioriteras",
        "category": "enterprise"
      },
      {
        "phrase": "Border Leaf",
        "meaning": "Specialized leaf switch connecting the data center fabric to external networks (WAN, internet) while maintaining leaf-spine principles",
        "translation": "Border Leaf",
        "translationSv": "Specialiserad leaf-switch som ansluter datacenterfabriken till externa nätverk",
        "category": "enterprise"
      },
      {
        "phrase": "BPDU Guard",
        "meaning": "STP protection feature that err-disables a port if a BPDU is received, preventing rogue switch attacks",
        "translation": "BPDU Guard",
        "translationSv": "STP-skydd som fel-inaktiverar en port om en BPDU tas emot",
        "category": "switching"
      },
      {
        "phrase": "Bridge Protocol Data Unit (BPDU)",
        "meaning": "STP frames exchanged between switches containing bridge ID, path cost, port ID, and timer values",
        "translation": "BPDU",
        "translationSv": "STP-ramar som utbyts mellan switchar med brygg-ID, vägkostnad, port-ID och timervärden",
        "category": "switching"
      },
      {
        "phrase": "Broadcast MAC",
        "meaning": "MAC address FF:FF:FF:FF:FF:FF used to reach all devices on a local network segment",
        "translation": "Broadcast-MAC",
        "translationSv": "MAC-adress FF:FF:FF:FF:FF:FF för att nå alla enheter i ett lokalt nätverkssegment",
        "category": "fundamentals"
      },
      {
        "phrase": "CAM Table",
        "meaning": "Content-Addressable Memory table used for MAC address lookups in switches. Faster than TCAM for exact matches",
        "translation": "CAM-tabell",
        "translationSv": "Content-Addressable Memory-tabell för MAC-adressuppslagning i switchar. Snabbare än TCAM för exakta matchningar",
        "category": "switching"
      },
      {
        "phrase": "CAPWAP",
        "meaning": "Control and Provisioning of Wireless Access Points - protocol between lightweight APs and WLC. Splits control (UDP 5246) and data (UDP 5247)",
        "translation": "CAPWAP",
        "translationSv": "Protokoll mellan lightweight-AP och WLC. Delar kontroll- och dataplan",
        "category": "enterprise"
      },
      {
        "phrase": "Cat5e",
        "meaning": "Enhanced Category 5 twisted pair cable supporting up to 1000BASE-T (1 Gbps) at 100 MHz",
        "translation": "Cat5e",
        "translationSv": "Förbättrad kategori 5-partvinnad kabel som stöder upp till 1000BASE-T (1 Gbps) vid 100 MHz",
        "category": "fundamentals"
      },
      {
        "phrase": "Cat6",
        "meaning": "Category 6 twisted pair cable supporting up to 10GBASE-T at 250 MHz, limited to 55m for 10 Gbps",
        "translation": "Cat6",
        "translationSv": "Kategori 6-partvinnad kabel som stöder upp till 10GBASE-T vid 250 MHz, begränsad till 55m för 10 Gbps",
        "category": "fundamentals"
      },
      {
        "phrase": "Cat6a",
        "meaning": "Augmented Category 6 cable supporting 10GBASE-T at 500 MHz up to 100m",
        "translation": "Cat6a",
        "translationSv": "Förbättrad kategori 6-kabel som stöder 10GBASE-T vid 500 MHz upp till 100m",
        "category": "fundamentals"
      },
      {
        "phrase": "CBWFQ",
        "meaning": "Class-Based Weighted Fair Queuing - QoS mechanism providing per-class bandwidth guarantees using user-defined traffic classes",
        "translation": "CBWFQ",
        "translationSv": "Class-Based Weighted Fair Queuing - QoS-mekanism med bandbreddsgarantier per klass",
        "category": "enterprise"
      },
      {
        "phrase": "chmod",
        "meaning": "Command to change file permissions. Octal: r=4, w=2, x=1. Symbolic: u/g/o/a + rwx",
        "translation": "chmod",
        "translationSv": "Kommando för att ändra filrättigheter",
        "category": "linux"
      },
      {
        "phrase": "CIDR Notation",
        "meaning": "Classless Inter-Domain Routing - notation showing IP address and subnet mask length, e.g., 192.168.1.0/24",
        "translation": "CIDR-notation",
        "translationSv": "Klasslös inter-domänrouting - notation som visar IP-adress och subnätsmasklängd",
        "category": "routing"
      },
      {
        "phrase": "Classful Addressing",
        "meaning": "Legacy IP addressing dividing addresses into fixed classes: A (1-126), B (128-191), C (192-223), D (224-239), E (240-255)",
        "translation": "Klassbaserad adressering",
        "translationSv": "Äldre IP-adressering som delar in adresser i fasta klasser: A, B, C, D, E",
        "category": "protocols"
      },
      {
        "phrase": "CompTIA 6-Step Troubleshooting",
        "meaning": "1. Identify problem, 2. Establish theory of probable cause, 3. Test theory, 4. Plan of action, 5. Verify functionality, 6. Document findings",
        "translation": "CompTIA 6-stegs felsökning",
        "translationSv": "CompTIA 6-stegs felsökningsprocess",
        "category": "hardware"
      },
      {
        "phrase": "Control Plane Policing (CoPP)",
        "meaning": "QoS mechanism protecting the router's control plane by rate-limiting control plane traffic",
        "translation": "CoPP",
        "translationSv": "QoS-mekanism som skyddar routerns kontrollplan genom hastighetsbegränsning",
        "category": "techniques"
      },
      {
        "phrase": "Crosstalk (NEXT/FEXT)",
        "meaning": "Electromagnetic interference from adjacent cable pairs. NEXT is measured at the near end, FEXT at the far end",
        "translation": "Övertalning (NEXT/FEXT)",
        "translationSv": "Elektromagnetisk störning från intilliggande kabelpar. NEXT mäts vid nära änden, FEXT vid fjärränden",
        "category": "fundamentals"
      },
      {
        "phrase": "CSMA/CD",
        "meaning": "Carrier Sense Multiple Access with Collision Detection - legacy access method where devices listen before transmitting and detect collisions",
        "translation": "CSMA/CD",
        "translationSv": "Bärvågsavkänning med kollisionsdetektering - äldre accessmetod där enheter lyssnar före sändning och upptäcker kollisioner",
        "category": "fundamentals"
      },
      {
        "phrase": "Decapsulation",
        "meaning": "Process of removing headers and trailers as data moves up the OSI stack from L1 to L7",
        "translation": "Avkapsling",
        "translationSv": "Processen att ta bort huvuden och trailers när data rör sig uppåt i OSI-stacken",
        "category": "fundamentals"
      },
      {
        "phrase": "Deep Packet Inspection (DPI)",
        "meaning": "Firewall technology inspecting the full packet payload (not just headers) to identify applications and detect threats",
        "translation": "DPI",
        "translationSv": "Brandväggsteknik som inspekterar hela paketinnehållet för att identifiera applikationer och upptäcka hot",
        "category": "techniques"
      },
      {
        "phrase": "Default Route",
        "meaning": "0.0.0.0/0 - Route matching all destinations, used when no specific route exists in the routing table",
        "translation": "Standardväg",
        "translationSv": "0.0.0.0/0 - Väg som matchar alla destinationer när ingen specifik väg finns",
        "category": "routing"
      },
      {
        "phrase": "DHCP DORA Process",
        "meaning": "Discover (client broadcast), Offer (server offers IP), Request (client requests offered IP), Acknowledge (server confirms)",
        "translation": "DHCP DORA-process",
        "translationSv": "Discover, Offer, Request, Acknowledge - DHCP-processen för IP-tilldelning",
        "category": "config"
      },
      {
        "phrase": "DHCP Relay Agent",
        "meaning": "Router feature forwarding DHCP broadcasts across subnets, using the IP Helper Address (Option 82) to point to the DHCP server",
        "translation": "DHCP Relay Agent",
        "translationSv": "Routerfunktion som vidarebefordrar DHCP-broadcasts över subnät",
        "category": "config"
      },
      {
        "phrase": "DHCP Snooping",
        "meaning": "Security feature filtering DHCP messages by distinguishing trusted (server-facing) from untrusted (client-facing) ports",
        "translation": "DHCP Snooping",
        "translationSv": "Säkerhetsfunktion som filtrerar DHCP-meddelanden mellan betrodda och icke-betrodda portar",
        "category": "techniques"
      },
      {
        "phrase": "DHCP Starvation",
        "meaning": "Attack sending forged DHCP requests to exhaust a DHCP server's IP address pool",
        "translation": "DHCP-utarmning",
        "translationSv": "Attack med förfalskade DHCP-förfrågningar för att tömma en DHCP-servers IP-adresspool",
        "category": "threats"
      },
      {
        "phrase": "DHCPv6 Stateful",
        "meaning": "DHCPv6 mode where the server assigns both IPv6 address and configuration parameters, similar to DHCPv4",
        "translation": "Tillståndsbaserad DHCPv6",
        "translationSv": "DHCPv6-läge där servern tilldelar både IPv6-adress och konfigurationsparametrar, liknande DHCPv4",
        "category": "protocols"
      },
      {
        "phrase": "DHCPv6 Stateless",
        "meaning": "DHCPv6 mode providing additional parameters (DNS, domain) to hosts that obtain their address via SLAAC",
        "translation": "Tillståndslös DHCPv6",
        "translationSv": "DHCPv6-läge som ger ytterligare parametrar (DNS, domän) till värdar som får sin adress via SLAAC",
        "category": "protocols"
      },
      {
        "phrase": "DiffServ",
        "meaning": "Differentiated Services - scalable QoS model marking packets with DSCP (6 bits) at the edge for per-hop behavior treatment in the core",
        "translation": "DiffServ",
        "translationSv": "Differentiated Services - skalbar QoS-modell med DSCP-märkning",
        "category": "enterprise"
      },
      {
        "phrase": "DMVPN",
        "meaning": "Dynamic Multipoint VPN - Cisco solution combining mGRE, NHRP, and IPsec for scalable hub-and-spoke VPN with direct spoke-to-spoke tunnels",
        "translation": "DMVPN",
        "translationSv": "Dynamic Multipoint VPN - Cisco-lösning för skalbar hub-and-spoke-VPN",
        "category": "techniques"
      },
      {
        "phrase": "DMZ",
        "meaning": "Demilitarized Zone - separate network segment between internal and external networks hosting public-facing services",
        "translation": "DMZ",
        "translationSv": "Demilitariserad zon - separat nätverkssegment mellan internt och externt nätverk för publika tjänster",
        "category": "techniques"
      },
      {
        "phrase": "DNS Record Types",
        "meaning": "A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail exchange), PTR (reverse), TXT (text), NS (nameserver), SOA (start of authority)",
        "translation": "DNS-posttyper",
        "translationSv": "DNS-posttyper: A, AAAA, CNAME, MX, PTR, TXT, NS, SOA",
        "category": "config"
      },
      {
        "phrase": "DSCP",
        "meaning": "Differentiated Services Code Point - 6-bit field in IP header for QoS marking. Values: EF (46), AF41 (34), AF31 (26), AF21 (18), CS0-7",
        "translation": "DSCP",
        "translationSv": "Differentiated Services Code Point - 6-bitars fält i IP-headern för QoS-märkning",
        "category": "enterprise"
      },
      {
        "phrase": "DTP",
        "meaning": "Dynamic Trunking Protocol - Cisco proprietary protocol for automatically negotiating trunk mode between switches",
        "translation": "DTP",
        "translationSv": "Dynamic Trunking Protocol - Cisco-proprietärt protokoll för automatisk trunkförhandling mellan switchar",
        "category": "switching"
      },
      {
        "phrase": "Duplicate Address Detection (DAD)",
        "meaning": "NDP mechanism where a host sends NS with its own address as target to verify uniqueness before assigning an IPv6 address",
        "translation": "DAD",
        "translationSv": "NDP-mekanism där en värd skickar NS med sin egen adress som mål för att verifiera unikhet innan IPv6-adress tilldelas",
        "category": "protocols"
      },
      {
        "phrase": "Dynamic ARP Inspection (DAI)",
        "meaning": "Security feature validating ARP packets against the DHCP Snooping binding table to prevent ARP poisoning",
        "translation": "DAI",
        "translationSv": "Säkerhetsfunktion som validerar ARP-paket mot DHCP Snooping-bindningstabellen",
        "category": "techniques"
      },
      {
        "phrase": "Dynamic NAT",
        "meaning": "One-to-one mapping from a pool of private IPs to a pool of public IPs. M:N relationship",
        "translation": "Dynamisk NAT",
        "translationSv": "En-till-en-mappning från en pool privata IP-adresser till en pool publika IP-adresser",
        "category": "techniques"
      },
      {
        "phrase": "eBGP",
        "meaning": "External BGP peering between different autonomous systems. Default TTL=1. Routes carry AS-Path information",
        "translation": "eBGP",
        "translationSv": "Extern BGP-peering mellan olika autonoma system",
        "category": "enterprise"
      },
      {
        "phrase": "EIGRP",
        "meaning": "Enhanced Interior Gateway Routing Protocol - Cisco proprietary advanced distance vector protocol using DUAL algorithm",
        "translation": "EIGRP",
        "translationSv": "Enhanced Interior Gateway Routing Protocol - Cisco-proprietärt avancerat distance vector-protokoll med DUAL-algoritm",
        "category": "routing"
      },
      {
        "phrase": "EIGRP DUAL Algorithm",
        "meaning": "Diffusing Update Algorithm - provides loop-free path selection and fast convergence by using feasible successors",
        "translation": "EIGRP DUAL-algoritm",
        "translationSv": "Diffusing Update Algorithm - loopfri vägval och snabb konvergens",
        "category": "routing"
      },
      {
        "phrase": "EIGRP Feasibility Condition",
        "meaning": "Rule: A route is a feasible successor if the neighbor's Reported Distance (RD) is less than the current Feasible Distance (FD)",
        "translation": "EIGRP Feasibility Condition",
        "translationSv": "Regel: En väg är en feasible successor om grannens RD är mindre än nuvarande FD",
        "category": "routing"
      },
      {
        "phrase": "EIGRP Feasible Successor",
        "meaning": "Backup route that satisfies the Feasibility Condition: Reported Distance < Feasible Distance. Provides instantaneous failover",
        "translation": "EIGRP Feasible Successor",
        "translationSv": "Backup-väg som uppfyller Feasibility Condition för omedelbar redundans",
        "category": "routing"
      },
      {
        "phrase": "EIGRP K-Values",
        "meaning": "Metric weights: K1=Bandwidth, K2=Load, K3=Delay, K4=Reliability, K5=MTU. Default: K1=1, K3=1, others=0",
        "translation": "EIGRP K-värden",
        "translationSv": "Metrikvikter: K1=Bandbredd, K2=Last, K3=Fördröjning, K4=Tillförlitlighet, K5=MTU",
        "category": "routing"
      },
      {
        "phrase": "Encapsulation",
        "meaning": "Process of adding headers and trailers as data moves down the OSI stack from L7 to L1",
        "translation": "Inkapsling",
        "translationSv": "Processen att lägga till huvuden och trailers när data rör sig nedåt i OSI-stacken",
        "category": "fundamentals"
      },
      {
        "phrase": "Equal-Cost Multipath (ECMP)",
        "meaning": "Routing technique that load-balances traffic across multiple paths with equal metric. Uses hash-based path selection",
        "translation": "ECMP",
        "translationSv": "Routerteknik som lastbalanserar trafik över flera vägar med samma metrik",
        "category": "routing"
      },
      {
        "phrase": "Ethernet II Frame",
        "meaning": "Frame format: Preamble (7 bytes), SFD (1), Destination MAC (6), Source MAC (6), EtherType (2), Payload (46-1500), FCS (4)",
        "translation": "Ethernet II-ram",
        "translationSv": "Ramformat: Preamble (7 byte), SFD (1), Destinations-MAC (6), Käll-MAC (6), EtherType (2), Payload (46-1500), FCS (4)",
        "category": "fundamentals"
      },
      {
        "phrase": "EUI-64",
        "meaning": "Method to derive a 64-bit interface identifier from a 48-bit MAC address by inserting FFFE in the middle and flipping the 7th bit",
        "translation": "EUI-64",
        "translationSv": "Metod för att härleda en 64-bitars gränssnittsidentifierare från en 48-bitars MAC-adress",
        "category": "protocols"
      },
      {
        "phrase": "EVPN",
        "meaning": "Ethernet VPN - control plane for VXLAN using BGP to distribute MAC/VTEP information across the fabric",
        "translation": "EVPN",
        "translationSv": "Ethernet VPN - kontrollplan för VXLAN med BGP för MAC/VTEP-distribution",
        "category": "cloud"
      },
      {
        "phrase": "Extended ACL",
        "meaning": "Access list filtering on source IP, destination IP, protocol, and port. Numbered 100-199 and 2000-2699. Place close to source",
        "translation": "Extended ACL",
        "translationSv": "Access-lista som filtrerar på käll-IP, destinations-IP, protokoll och port",
        "category": "techniques"
      },
      {
        "phrase": "Floating Static Route",
        "meaning": "Static route with a higher AD than the primary route, used as a backup in case the dynamic route fails",
        "translation": "Flytande statisk väg",
        "translationSv": "Statisk väg med högre AD än primärvägen, används som backup om den dynamiska vägen misslyckas",
        "category": "routing"
      },
      {
        "phrase": "Frame Check Sequence (FCS)",
        "meaning": "Trailer field using CRC to detect data corruption in an Ethernet frame",
        "translation": "Ramkontrollsekvens",
        "translationSv": "Trailer-fält som använder CRC för att upptäcka datakorruption i en Ethernet-ram",
        "category": "fundamentals"
      },
      {
        "phrase": "Full Duplex",
        "meaning": "Communication mode allowing simultaneous two-way data transmission on a link",
        "translation": "Full duplex",
        "translationSv": "Kommunikationsläge som tillåter samtidig tvåvägsdataöverföring på en länk",
        "category": "fundamentals"
      },
      {
        "phrase": "GLBP",
        "meaning": "Gateway Load Balancing Protocol - Cisco FHRP providing load balancing across multiple gateways with a single virtual IP",
        "translation": "GLBP",
        "translationSv": "Gateway Load Balancing Protocol - Cisco FHRP som lastbalanserar över flera gateways",
        "category": "enterprise"
      },
      {
        "phrase": "Gratuitous ARP (GARP)",
        "meaning": "ARP reply broadcast without a corresponding request, used to announce IP-MAC mapping changes or detect duplicate IPs",
        "translation": "Gratuitous ARP",
        "translationSv": "ARP-svar broadcast utan motsvarande förfrågan, används för att annonsera IP-MAC-mappningsändringar eller upptäcka dubbla IP-adresser",
        "category": "protocols"
      },
      {
        "phrase": "GRE Tunnel",
        "meaning": "Generic Routing Encapsulation - tunneling protocol encapsulating packets over IP. No encryption, often used with IPsec",
        "translation": "GRE-tunnel",
        "translationSv": "Generic Routing Encapsulation - tunnelprotokoll som kapslar in paket över IP",
        "category": "techniques"
      },
      {
        "phrase": "grep",
        "meaning": "Command-line text search tool. Common: -i (ignore case), -r (recursive), -v (invert match), -E (extended regex)",
        "translation": "grep",
        "translationSv": "Kommandoradsverktyg för textsökning",
        "category": "linux"
      },
      {
        "phrase": "Half Duplex",
        "meaning": "Communication mode allowing two-way transmission but only one direction at a time",
        "translation": "Halv duplex",
        "translationSv": "Kommunikationsläge som tillåter tvåvägsöverföring men endast en riktning i taget",
        "category": "fundamentals"
      },
      {
        "phrase": "HSRP",
        "meaning": "Hot Standby Router Protocol - Cisco FHRP providing active/standby gateway redundancy. Virtual IP shared between routers",
        "translation": "HSRP",
        "translationSv": "Hot Standby Router Protocol - Cisco FHRP med aktiv/standby gateway-redundans",
        "category": "enterprise"
      },
      {
        "phrase": "iBGP",
        "meaning": "Internal BGP peering within the same autonomous system. Requires full mesh or route reflectors due to split-horizon rule",
        "translation": "iBGP",
        "translationSv": "Intern BGP-peering inom samma autonoma system",
        "category": "enterprise"
      },
      {
        "phrase": "ICMP Destination Unreachable",
        "meaning": "ICMP Type 3 message sent when a packet cannot reach its destination, with codes for network/host/port/protocol unreachable",
        "translation": "ICMP Destination onåbar",
        "translationSv": "ICMP Typ 3-meddelande som skickas när ett paket inte kan nå sin destination",
        "category": "protocols"
      },
      {
        "phrase": "ICMP Echo Request/Reply",
        "meaning": "ICMP Type 8 (Request) and Type 0 (Reply) used by ping to test reachability and measure RTT",
        "translation": "ICMP Eko-förfrågan/Svar",
        "translationSv": "ICMP Typ 8 (Förfrågan) och Typ 0 (Svar) som används av ping för att testa tillgänglighet och mäta RTT",
        "category": "protocols"
      },
      {
        "phrase": "ICMP Time Exceeded",
        "meaning": "ICMP Type 11 message sent when a packet's TTL reaches zero, used by traceroute to map network paths",
        "translation": "ICMP Tid överskriden",
        "translationSv": "ICMP Typ 11-meddelande som skickas när ett pakets TTL når noll, används av traceroute för att kartlägga nätverksvägar",
        "category": "protocols"
      },
      {
        "phrase": "IKEv1 Aggressive Mode",
        "meaning": "ISAKMP Phase 1 using 3 packets. Faster but less secure as identities are sent in cleartext before encryption is established",
        "translation": "IKEv1 Aggressive Mode",
        "translationSv": "ISAKMP Fas 1 med 3 paket. Snabbare men mindre säkert",
        "category": "techniques"
      },
      {
        "phrase": "IKEv1 Main Mode",
        "meaning": "ISAKMP Phase 1 negotiation using 6 packets. More secure than Aggressive Mode. Negotiates HAGLE parameters: Hash, Auth, DH Group, Lifetime, Encryption",
        "translation": "IKEv1 Main Mode",
        "translationSv": "ISAKMP Fas 1-förhandling med 6 paket. Förhandlar HAGLE-parametrar",
        "category": "techniques"
      },
      {
        "phrase": "Implicit Deny All",
        "meaning": "ACL rule: if no permit statement matches, the packet is denied by default. Applies at the end of every ACL",
        "translation": "Implicit Deny All",
        "translationSv": "ACL-regel: om ingen permit-sats matchar, nekas paketet som standard",
        "category": "techniques"
      },
      {
        "phrase": "IP Source Guard (IPSG)",
        "meaning": "Security feature filtering IP traffic based on the DHCP Snooping binding table, preventing IP spoofing",
        "translation": "IPSG",
        "translationSv": "Säkerhetsfunktion som filtrerar IP-trafik baserat på DHCP Snooping-bindningstabellen",
        "category": "techniques"
      },
      {
        "phrase": "IPsec AH",
        "meaning": "Authentication Header - IPsec protocol providing integrity and authentication but no encryption",
        "translation": "IPsec AH",
        "translationSv": "IPsec-protokoll som ger integritet och autentisering men ingen kryptering",
        "category": "techniques"
      },
      {
        "phrase": "IPsec ESP",
        "meaning": "Encapsulating Security Payload - IPsec protocol providing confidentiality (encryption), integrity, and authentication. Transport mode encrypts payload only, Tunnel mode encrypts entire packet",
        "translation": "IPsec ESP",
        "translationSv": "IPsec-protokoll som ger konfidentialitet (kryptering), integritet och autentisering",
        "category": "techniques"
      },
      {
        "phrase": "IPv4 Address",
        "meaning": "32-bit logical address in dotted-decimal notation (e.g., 192.168.1.1), consisting of network and host portions",
        "translation": "IPv4-adress",
        "translationSv": "32-bitars logisk adress i punkt-decimal notation (t.ex. 192.168.1.1), bestående av nätverks- och värddelar",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Address",
        "meaning": "128-bit logical address in hexadecimal colon notation (e.g., 2001:db8::1). Supports 3.4x10^38 addresses",
        "translation": "IPv6-adress",
        "translationSv": "128-bitars logisk adress i hexadecimal kolon-notation (t.ex. 2001:db8::1). Stöder 3.4x10^38 adresser",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Anycast",
        "meaning": "Address assigned to multiple interfaces; packets are delivered to the nearest interface based on routing metric",
        "translation": "IPv6 Anycast",
        "translationSv": "Adress tilldelad flera gränssnitt; paket levereras till närmaste gränssnitt baserat på routingmetrik",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Fragmentation",
        "meaning": "In IPv6, only the source host can fragment packets (using fragmentation header). Routers do not fragment. Uses Path MTU Discovery",
        "translation": "IPv6-fragmentering",
        "translationSv": "I IPv6 kan endast källvärden fragmentera paket. Routrar fragmenterar inte. Använder Path MTU Discovery",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Global Unicast",
        "meaning": "2000::/3 - Globally routable IPv6 addresses, equivalent to public IPv4 addresses",
        "translation": "IPv6 Global Unicast",
        "translationSv": "2000::/3 - Globalt routerbara IPv6-adresser, motsvarar publika IPv4-adresser",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Link-Local",
        "meaning": "FE80::/10 - Automatically assigned addresses used for communication on a single link, used by NDP",
        "translation": "IPv6 Link-Local",
        "translationSv": "FE80::/10 - Automatiskt tilldelade adresser för kommunikation på en enskild länk, används av NDP",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Multicast",
        "meaning": "FF00::/8 - IPv6 multicast addresses for one-to-many communication. Replaces IPv4 broadcast",
        "translation": "IPv6 Multicast",
        "translationSv": "FF00::/8 - IPv6-multicast-adresser för en-till-många-kommunikation. Ersätter IPv4 broadcast",
        "category": "protocols"
      },
      {
        "phrase": "IPv6 Unique Local",
        "meaning": "FC00::/7 - Private IPv6 addresses for local use, equivalent to RFC 1918 private ranges",
        "translation": "IPv6 Unique Local",
        "translationSv": "FC00::/7 - Privata IPv6-adresser för lokalt bruk, motsvarar RFC 1918 privata intervall",
        "category": "protocols"
      },
      {
        "phrase": "LACP (802.3ad)",
        "meaning": "Link Aggregation Control Protocol - bundles multiple physical links into a single logical link for increased bandwidth and redundancy",
        "translation": "LACP",
        "translationSv": "Link Aggregation Control Protocol - buntar flera fysiska länkar till en logisk länk",
        "category": "enterprise"
      },
      {
        "phrase": "Leaf-Spine Architecture",
        "meaning": "Data center topology where every leaf switch connects to every spine switch. Provides predictable latency, easy scalability, and non-blocking bandwidth",
        "translation": "Leaf-Spine-arkitektur",
        "translationSv": "Datacentertopologi där varje leaf-switch ansluts till varje spine-switch",
        "category": "enterprise"
      },
      {
        "phrase": "Linux File System Hierarchy",
        "meaning": "Directory structure: /etc (config), /var (logs), /usr (programs), /home (users), /dev (devices), /proc (process info)",
        "translation": "Linux-filsystemshierarki",
        "translationSv": "Katalogstruktur: /etc (konfig), /var (loggar), /usr (program), /home (användare), /dev (enheter), /proc (processinfo)",
        "category": "linux"
      },
      {
        "phrase": "LLQ",
        "meaning": "Low Latency Queuing - QoS queuing mechanism providing a strict priority queue for delay-sensitive traffic (voice) with bandwidth guarantees for other queues",
        "translation": "LLQ",
        "translationSv": "Low Latency Queuing - QoS-kömekanism med strikt prioritetskö för fördröjningskänslig trafik",
        "category": "enterprise"
      },
      {
        "phrase": "Longest Prefix Match",
        "meaning": "Routing lookup rule: the route with the most specific (longest) subnet mask is selected from the routing table",
        "translation": "Longest Prefix Match",
        "translationSv": "Routeringsregel: den mest specifika (längsta) subnätsmasken väljs från routingtabellen",
        "category": "routing"
      },
      {
        "phrase": "Loop Guard",
        "meaning": "STP protection that places a port into loop-inconsistent state if BPDUs stop being received, preventing unidirectional link issues",
        "translation": "Loop Guard",
        "translationSv": "STP-skydd som placerar en port i loop-inconsistent tillstånd om BPDU:er slutar tas emot",
        "category": "switching"
      },
      {
        "phrase": "Loopback Address",
        "meaning": "127.0.0.0/8 range used for local testing. 127.0.0.1 is the standard loopback address pointing to the local host",
        "translation": "Loopback-adress",
        "translationSv": "127.0.0.0/8-intervall för lokal testning. 127.0.0.1 är standard loopback-adress som pekar på den lokala värden",
        "category": "protocols"
      },
      {
        "phrase": "MAC Address",
        "meaning": "48-bit hardware address assigned to a network interface. Format: 24-bit OUI + 24-bit vendor-assigned NIC",
        "translation": "MAC-adress",
        "translationSv": "48-bitars hårdvaruadress tilldelad ett nätverksgränssnitt. Format: 24-bit OUI + 24-bit leverantörstilldelad NIC",
        "category": "fundamentals"
      },
      {
        "phrase": "MAC Address Table",
        "meaning": "Table on a switch that maps MAC addresses to ports. Operations: Learn, Forward, Filter, Flood, Age",
        "translation": "MAC-adresstabell",
        "translationSv": "Tabell på en switch som mappar MAC-adresser till portar. Operationer: Lär, Vidarebefordra, Filtrera, Översvämma, Åldra",
        "category": "switching"
      },
      {
        "phrase": "MAC Flooding",
        "meaning": "Attack flooding a switch with fake MAC addresses to overflow the CAM table, causing it to fail-open and flood traffic",
        "translation": "MAC-översvämning",
        "translationSv": "Attack som översvämmar en switch med falska MAC-adresser för att överfylla CAM-tabellen",
        "category": "threats"
      },
      {
        "phrase": "Maximum Transmission Unit (MTU)",
        "meaning": "Largest PDU size that can be transmitted in a single network layer transaction. Standard Ethernet MTU is 1500 bytes",
        "translation": "Maximal överföringsenhet",
        "translationSv": "Största PDU-storlek som kan överföras i en nätverkslager-transaktion. Standard Ethernet MTU är 1500 byte",
        "category": "fundamentals"
      },
      {
        "phrase": "Mesh Topology",
        "meaning": "Network topology where devices are interconnected. Full mesh = every device to every other. Partial mesh = selective connections",
        "translation": "Nättopologi",
        "translationSv": "Nätverkstopologi där enheter är sammankopplade. Fullt nät = alla till alla. Partiellt nät = selektiva anslutningar",
        "category": "fundamentals"
      },
      {
        "phrase": "Multi-Mode Fiber (MMF)",
        "meaning": "Fiber optic cable with larger core (~50/62.5um) used for shorter distances with LED light source",
        "translation": "Multimodsfiber",
        "translationSv": "Fiberoptisk kabel med större kärna (~50/62.5um) för kortare avstånd med LED-källa",
        "category": "fundamentals"
      },
      {
        "phrase": "Multicast MAC",
        "meaning": "MAC address for group communication. IPv4 multicast maps to 01:00:5E:xx:xx:xx",
        "translation": "Multicast-MAC",
        "translationSv": "MAC-adress för gruppkommunikation. IPv4-multicast mappas till 01:00:5E:xx:xx:xx",
        "category": "fundamentals"
      },
      {
        "phrase": "Multiple STP (802.1s)",
        "meaning": "MSTP maps multiple VLANs to fewer spanning tree instances, reducing CPU load while maintaining per-VLAN loop prevention",
        "translation": "Multiple STP",
        "translationSv": "MSTP mappar flera VLAN till färre spanning tree-instanser",
        "category": "switching"
      },
      {
        "phrase": "Named ACL",
        "meaning": "Access list with a descriptive name instead of a number. Supports both standard and extended filtering",
        "translation": "Named ACL",
        "translationSv": "Access-lista med beskrivande namn istället för nummer",
        "category": "techniques"
      },
      {
        "phrase": "napalm",
        "meaning": "Network Automation and Programmability Abstraction Layer with Multi-vendor support - Python library providing consistent API across network OS types",
        "translation": "napalm",
        "translationSv": "Python-bibliotek med konsekvent API över olika nätverks-OS",
        "category": "automation"
      },
      {
        "phrase": "NAT Inside Global",
        "meaning": "Public IP address assigned to an internal device after NAT translation",
        "translation": "NAT Inside Global",
        "translationSv": "Publik IP-adress tilldelad en intern enhet efter NAT-översättning",
        "category": "techniques"
      },
      {
        "phrase": "NAT Inside Local",
        "meaning": "Private IP address of a device inside the internal network before translation",
        "translation": "NAT Inside Local",
        "translationSv": "Privat IP-adress för en enhet i det interna nätverket före översättning",
        "category": "techniques"
      },
      {
        "phrase": "Native VLAN",
        "meaning": "VLAN assigned to untagged traffic on a trunk port. Default is VLAN 1. Mismatch causes VLAN Hopping risk",
        "translation": "Native VLAN",
        "translationSv": "VLAN tilldelat otaggad trafik på en trunkport. Standard är VLAN 1. Mismatch orsakar VLAN Hopping-risk",
        "category": "switching"
      },
      {
        "phrase": "Neighbor Advertisement (NA)",
        "meaning": "ICMPv6 Type 136 - IPv6 equivalent of ARP Reply, responds to Neighbor Solicitation with link-layer address",
        "translation": "Neighbor Advertisement",
        "translationSv": "ICMPv6 Typ 136 - IPv6-motsvarighet till ARP Reply, svarar på Neighbor Solicitation med länklageradress",
        "category": "protocols"
      },
      {
        "phrase": "Neighbor Discovery Protocol (NDP)",
        "meaning": "IPv6 protocol replacing ARP, using ICMPv6 messages for address resolution, router discovery, and neighbor reachability",
        "translation": "NDP",
        "translationSv": "IPv6-protokoll som ersätter ARP, använder ICMPv6-meddelanden för adressupplösning, routerupptäckt och grannarnas tillgänglighet",
        "category": "protocols"
      },
      {
        "phrase": "Neighbor Solicitation (NS)",
        "meaning": "ICMPv6 Type 135 - IPv6 equivalent of ARP Request, used to resolve a neighbor's link-layer address",
        "translation": "Neighbor Solicitation",
        "translationSv": "ICMPv6 Typ 135 - IPv6-motsvarighet till ARP Request, används för att lösa en grannes länklageradress",
        "category": "protocols"
      },
      {
        "phrase": "NETCONF",
        "meaning": "Network Configuration Protocol using SSH (port 830) and XML-encoded YANG data models for device configuration and management",
        "translation": "NETCONF",
        "translationSv": "Nätverkskonfigurationsprotokoll med SSH och XML-kodade YANG-datamodeller",
        "category": "automation"
      },
      {
        "phrase": "netmiko",
        "meaning": "Python library simplifying SSH connections to network devices. Multi-vendor support with consistent interface",
        "translation": "netmiko",
        "translationSv": "Python-bibliotek för SSH-anslutning till nätverksenheter med flera leverantörer",
        "category": "automation"
      },
      {
        "phrase": "NFV",
        "meaning": "Network Function Virtualization - running network functions (firewalls, routers, load balancers) as software on standard servers",
        "translation": "NFV",
        "translationSv": "Network Function Virtualization - nätverksfunktioner som programvara på standardservrar",
        "category": "cloud"
      },
      {
        "phrase": "NGFW",
        "meaning": "Next-Generation Firewall combining stateful inspection with DPI, application ID, user ID, and integrated IPS",
        "translation": "NGFW",
        "translationSv": "Next-Generation-brandvägg som kombinerar stateful-inspektion med DPI, app-ID, användar-ID och IPS",
        "category": "techniques"
      },
      {
        "phrase": "NTP Stratum",
        "meaning": "Hierarchical time source level. Stratum 0 = atomic clock, Stratum 1 = direct sync to stratum 0, up to Stratum 15",
        "translation": "NTP-stratum",
        "translationSv": "Hierarkisk tidskällenivå. Stratum 0 = atomklocka, upp till stratum 15",
        "category": "config"
      },
      {
        "phrase": "NVMe",
        "meaning": "Non-Volatile Memory Express - high-performance storage protocol over PCIe. Lower latency and higher IOPS vs SATA/SAS",
        "translation": "NVMe",
        "translationSv": "Non-Volatile Memory Express - högpresterande lagringsprotokoll över PCIe",
        "category": "hardware"
      },
      {
        "phrase": "OSI 7-Layer Model",
        "meaning": "Conceptual model dividing network communication into 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application",
        "translation": "OSI-modellen",
        "translationSv": "Konceptuell modell som delar upp nätverkskommunikation i sju lager: Fysiska, Datalänk, Nätverk, Transport, Session, Presentation, Applikation",
        "category": "fundamentals"
      },
      {
        "phrase": "OSPF",
        "meaning": "Open Shortest Path First - Link-state IGP using Dijkstra's SPF algorithm. Supports areas, VLSM, fast convergence",
        "translation": "OSPF",
        "translationSv": "Open Shortest Path First - Link-state IGP med Dijkstras SPF-algoritm",
        "category": "routing"
      },
      {
        "phrase": "OSPF Area Types",
        "meaning": "Backbone (Area 0), Standard, Stub (no Type 5 LSAs), Totally Stubby (no Type 3/4/5), NSSA (allows limited external routes)",
        "translation": "OSPF-områdestyper",
        "translationSv": "OSPF-områdestyper: Backbone, Standard, Stub, Totally Stubby, NSSA",
        "category": "routing"
      },
      {
        "phrase": "OSPF Database Description (DBD)",
        "meaning": "Type 2 OSPF packet summarizing the link-state database. Used during the ExStart and Exchange states",
        "translation": "OSPF DBD",
        "translationSv": "Typ 2 OSPF-paket som sammanfattar link-state-databasen",
        "category": "routing"
      },
      {
        "phrase": "OSPF DR/BDR Election",
        "meaning": "Designated Router and Backup Designated Router elected on broadcast multi-access segments. Highest Priority > Router ID wins",
        "translation": "OSPF DR/BDR-val",
        "translationSv": "Designated Router och Backup DR valda på broadcast multi-access-segment",
        "category": "routing"
      },
      {
        "phrase": "OSPF Hello Packet",
        "meaning": "Type 1 OSPF packet used to discover and maintain neighbor relationships. Contains router ID, timers, area ID, neighbors",
        "translation": "OSPF Hello-paket",
        "translationSv": "Typ 1 OSPF-paket för att upptäcka och underhålla granrelationer",
        "category": "routing"
      },
      {
        "phrase": "OSPF Link State Acknowledgment (LSAck)",
        "meaning": "Type 5 OSPF packet acknowledging receipt of LSUs for reliable flooding",
        "translation": "OSPF LSAck",
        "translationSv": "Typ 5 OSPF-paket som bekräftar mottagning av LSU",
        "category": "routing"
      },
      {
        "phrase": "OSPF Link State Request (LSR)",
        "meaning": "Type 3 OSPF packet requesting specific link-state advertisements from a neighbor after DBD exchange",
        "translation": "OSPF LSR",
        "translationSv": "Typ 3 OSPF-paket som begär specifika LSA från en granne",
        "category": "routing"
      },
      {
        "phrase": "OSPF Link State Update (LSU)",
        "meaning": "Type 4 OSPF packet carrying the actual link-state advertisements in response to LSRs",
        "translation": "OSPF LSU",
        "translationSv": "Typ 4 OSPF-paket som bär de faktiska LSA som svar på LSR",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 1 (Router)",
        "meaning": "Describes a router's interfaces and neighbors within the same area. Flooded within a single area only",
        "translation": "OSPF LSA Typ 1",
        "translationSv": "Beskriver en routers gränssnitt och grannar inom samma område",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 2 (Network)",
        "meaning": "Generated by the DR on broadcast segments, listing all routers attached to that segment",
        "translation": "OSPF LSA Typ 2",
        "translationSv": "Genereras av DR på broadcast-segment, listar alla routrar på segmentet",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 3 (Summary)",
        "meaning": "Used by ABRs to advertise networks from one area to another. Summarizes inter-area routes",
        "translation": "OSPF LSA Typ 3",
        "translationSv": "Används av ABR för att annonsera nätverk mellan områden",
        "category": "routing"
      },
      {
        "phrase": "OSPF LSA Type 5 (External)",
        "meaning": "Generated by ASBRs to advertise routes from outside the OSPF domain into the OSPF network",
        "translation": "OSPF LSA Typ 5",
        "translationSv": "Genereras av ASBR för att annonsera rutter utifrån OSPF-domänen",
        "category": "routing"
      },
      {
        "phrase": "OSPF Neighbor States",
        "meaning": "Down, Init, 2-Way, ExStart, Exchange, Loading, Full. 2-Way is the minimum for DR/BDR elections. Full indicates complete database sync",
        "translation": "OSPF-grannstillstånd",
        "translationSv": "OSPF-grannstillstånd: Down, Init, 2-Way, ExStart, Exchange, Loading, Full",
        "category": "routing"
      },
      {
        "phrase": "OSPF Router ID",
        "meaning": "32-bit identifier for an OSPF router. Determined by: configured RID > highest loopback IP > highest active interface IP",
        "translation": "OSPF Router ID",
        "translationSv": "32-bitars identifierare för en OSPF-router",
        "category": "routing"
      },
      {
        "phrase": "Packet Filter Firewall",
        "meaning": "Stateless firewall inspecting packet headers at L3-L4. Fast but lacks context awareness",
        "translation": "Paketfilter-brandvägg",
        "translationSv": "Tillståndslös brandvägg som inspekterar pakethuvuden på L3-L4",
        "category": "techniques"
      },
      {
        "phrase": "PAT (NAT Overload)",
        "meaning": "Port Address Translation - maps many private IPs to a single public IP using unique port numbers",
        "translation": "PAT",
        "translationSv": "Port Address Translation - mappar många privata IP-adresser till en enda publik IP med unika portnummer",
        "category": "techniques"
      },
      {
        "phrase": "Path MTU Discovery (PMTUD)",
        "meaning": "Technique to discover the minimum MTU along a network path using ICMP Fragmentation Needed messages",
        "translation": "Sökvägs-MTU-upptäckt",
        "translationSv": "Teknik för att upptäcka minsta MTU längs en nätverksväg med ICMP Fragmentation Needed-meddelanden",
        "category": "protocols"
      },
      {
        "phrase": "Perfect Forward Secrecy (PFS)",
        "meaning": "IPsec feature ensuring that if a private key is compromised, past session keys remain secure by generating new Diffie-Hellman keys per session",
        "translation": "PFS",
        "translationSv": "IPsec-funktion som säkerställer att tidigare sessionsnycklar förblir säkra även om en privat nyckel komprometteras",
        "category": "techniques"
      },
      {
        "phrase": "Port Security",
        "meaning": "Feature limiting the number and/or specific MAC addresses allowed on a switch port. Modes: Static, Dynamic, Sticky",
        "translation": "Portsäkerhet",
        "translationSv": "Funktion som begränsar antalet och/eller specifika MAC-adresser på en switchport. Lägen: Statisk, Dynamisk, Sticky",
        "category": "switching"
      },
      {
        "phrase": "Port Security Violation Modes",
        "meaning": "Protect (drops unknown frames), Restrict (drops + logs + SNMP trap), Shutdown (err-disables the port)",
        "translation": "Portsäkerhetsöverträdelselägen",
        "translationSv": "Protect (släpper okända ramar), Restrict (släpper + loggar + SNMP-fälla), Shutdown (fel-inaktiverar porten)",
        "category": "switching"
      },
      {
        "phrase": "Protocol Data Unit (PDU)",
        "meaning": "Data unit at each OSI layer: Bits (L1), Frames (L2), Packets (L3), Segments (L4), Data (L5-L7)",
        "translation": "Protokoll Data Enhet",
        "translationSv": "Dataenhet på varje OSI-lager: Bit, Ram, Paket, Segment, Data",
        "category": "fundamentals"
      },
      {
        "phrase": "Proxy ARP",
        "meaning": "Technique where a router answers ARP requests on behalf of another device, enabling communication across subnets",
        "translation": "Proxy-ARP",
        "translationSv": "Teknik där en router svarar på ARP-förfrågningar för en annan enhets räkning, vilket möjliggör kommunikation över subnät",
        "category": "protocols"
      },
      {
        "phrase": "RADIUS",
        "meaning": "Open standard AAA protocol. UDP ports 1812/1813. Encrypts password only. Combines authentication and authorization",
        "translation": "RADIUS",
        "translationSv": "Öppen standard AAA-protokoll. UDP-portar 1812/1813. Krypterar endast lösenord",
        "category": "techniques"
      },
      {
        "phrase": "RAID 0",
        "meaning": "Striping - data split across disks. Performance gain, no redundancy. Failure of one disk loses all data",
        "translation": "RAID 0",
        "translationSv": "Striping - data delas över diskar. Prestandavinst, ingen redundans",
        "category": "hardware"
      },
      {
        "phrase": "RAID 1",
        "meaning": "Mirroring - identical data on two disks. Redundancy, 50% capacity loss",
        "translation": "RAID 1",
        "translationSv": "Spegling - identisk data på två diskar. Redundans, 50% kapacitetsförlust",
        "category": "hardware"
      },
      {
        "phrase": "RAID 10",
        "meaning": "Striped mirror set - combines RAID 0 and RAID 1. Minimum 4 disks. Tolerates multiple disk failures with proper configuration",
        "translation": "RAID 10",
        "translationSv": "Striped mirror set - kombinerar RAID 0 och RAID 1",
        "category": "hardware"
      },
      {
        "phrase": "RAID 5",
        "meaning": "Striping with distributed parity. Requires minimum 3 disks. Single disk fault tolerance",
        "translation": "RAID 5",
        "translationSv": "Striping med distribuerad paritet. Minst 3 diskar. Tål en disks fel",
        "category": "hardware"
      },
      {
        "phrase": "Rapid STP (802.1w)",
        "meaning": "Enhanced STP with faster convergence using alternate/backup ports and proposal/agreement handshake instead of timers",
        "translation": "Rapid STP",
        "translationSv": "Förbättrad STP med snabbare konvergens genom alternativ/säkerhetskopieringsportar",
        "category": "switching"
      },
      {
        "phrase": "RESTCONF",
        "meaning": "Stateless RESTful API using HTTP/HTTPS for network device configuration. Supports JSON and XML with YANG data models",
        "translation": "RESTCONF",
        "translationSv": "Tillståndslöst RESTful API med HTTP/HTTPS för nätverksenhetskonfiguration",
        "category": "automation"
      },
      {
        "phrase": "RFC 1918 Private Ranges",
        "meaning": "Private IPv4 address ranges not routable on the internet: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
        "translation": "RFC 1918 Privata intervall",
        "translationSv": "Privata IPv4-adressintervall som inte är routerbara på internet",
        "category": "protocols"
      },
      {
        "phrase": "Root Bridge Election",
        "meaning": "STP election process: the switch with the lowest Bridge ID (Priority + MAC address) becomes the root bridge",
        "translation": "Rotbryggval",
        "translationSv": "STP-valprocess: switchen med lägst Bridge ID blir rotbrygga",
        "category": "switching"
      },
      {
        "phrase": "Root Guard",
        "meaning": "STP protection that prevents a port from becoming a root port, blocking superior BPDUs to protect root bridge status",
        "translation": "Root Guard",
        "translationSv": "STP-skydd som förhindrar en port från att bli root-port",
        "category": "switching"
      },
      {
        "phrase": "Router Advertisement (RA)",
        "meaning": "ICMPv6 Type 134 - Sent by routers to announce network prefix, default gateway, and address configuration method",
        "translation": "Router Advertisement",
        "translationSv": "ICMPv6 Typ 134 - Skickas av routrar för att annonsera nätverksprefix, standardgateway och adresskonfigurationsmetod",
        "category": "protocols"
      },
      {
        "phrase": "Router Solicitation (RS)",
        "meaning": "ICMPv6 Type 133 - Sent by hosts to request Router Advertisements from local routers",
        "translation": "Router Solicitation",
        "translationSv": "ICMPv6 Typ 133 - Skickas av värdar för att begära Router Advertisement från lokala routrar",
        "category": "protocols"
      },
      {
        "phrase": "Router-on-a-Stick",
        "meaning": "Inter-VLAN routing method using a router with a single trunk link to a switch, using subinterfaces",
        "translation": "Router-on-a-Stick",
        "translationSv": "Inter-VLAN-routingmetod med en router med en enda trunklänk till en switch, med undergränssnitt",
        "category": "routing"
      },
      {
        "phrase": "SASE",
        "meaning": "Secure Access Service Edge - converged cloud-native architecture combining SD-WAN with cloud security functions (SWG, CASB, FWaaS, ZTNA)",
        "translation": "SASE",
        "translationSv": "Secure Access Service Edge - konvergerad molnbaserad arkitektur som kombinerar SD-WAN med molnsäkerhet",
        "category": "enterprise"
      },
      {
        "phrase": "SD-WAN",
        "meaning": "Software-Defined WAN - architecture separating control plane from data plane. Centralized orchestration with intelligent path selection across multiple transports",
        "translation": "SD-WAN",
        "translationSv": "Programvarudefinierat WAN - arkitektur som separerar kontrollplan från dataplan",
        "category": "enterprise"
      },
      {
        "phrase": "SD-WAN Control Plane",
        "meaning": "Centralized or distributed plane managing routing, policies, and path selection decisions. Separated from data plane for flexibility",
        "translation": "SD-WAN-kontrollplan",
        "translationSv": "Centraliserat eller distribuerat plan för routing, policyer och vägval",
        "category": "enterprise"
      },
      {
        "phrase": "SD-WAN Data Plane",
        "meaning": "Forwarding plane handling packet processing, encapsulation, and traffic forwarding across overlay tunnels between edge devices",
        "translation": "SD-WAN-dataplan",
        "translationSv": "Vidarebefordringsplan för paketprocessning och trafiköverföring över overlay-tunnlar",
        "category": "enterprise"
      },
      {
        "phrase": "SD-WAN Orchestrator",
        "meaning": "Central management component for zero-touch provisioning, policy distribution, monitoring, and analytics across the SD-WAN fabric",
        "translation": "SD-WAN-orkestrator",
        "translationSv": "Central hanteringskomponent för zero-touch-provisionering och policy-distribution",
        "category": "enterprise"
      },
      {
        "phrase": "sed",
        "meaning": "Stream editor for text transformation. Common: s/old/new/g (substitute), /pattern/d (delete lines)",
        "translation": "sed",
        "translationSv": "Strömredigerare för textomvandling",
        "category": "linux"
      },
      {
        "phrase": "Single-Mode Fiber (SMF)",
        "meaning": "Fiber optic cable with small core (~9um) used for long-distance transmission with laser light source",
        "translation": "Singelmodsfiber",
        "translationSv": "Fiberoptisk kabel med liten kärna (~9um) för långdistansöverföring med laserkälla",
        "category": "fundamentals"
      },
      {
        "phrase": "SLAAC",
        "meaning": "Stateless Address Autoconfiguration - IPv6 hosts generate their own address using prefix from Router Advertisement and interface identifier (EUI-64 or random)",
        "translation": "SLAAC",
        "translationSv": "Tillståndslös adressautokonfiguration - IPv6-värdar genererar sin egen adress med prefix från Router Advertisement och gränssnittsidentifierare",
        "category": "protocols"
      },
      {
        "phrase": "Spanning Tree Protocol (STP)",
        "meaning": "802.1D protocol preventing bridge loops by creating a loop-free logical topology. Uses BPDUs to elect root bridge and block redundant ports",
        "translation": "Spanning Tree Protocol",
        "translationSv": "802.1D-protokoll som förhindrar nätverksslingor genom att skapa en loopfri logisk topologi",
        "category": "switching"
      },
      {
        "phrase": "Spine-Leaf Topology",
        "meaning": "Data center topology where every leaf switch connects to every spine switch in a full mesh, providing predictable latency and scalability",
        "translation": "Spine-Leaf-topologi",
        "translationSv": "Datacentertopologi där varje leaf-switch ansluts till varje spine-switch i ett fullt nät, vilket ger förutsägbar latens och skalbarhet",
        "category": "fundamentals"
      },
      {
        "phrase": "SR-IOV",
        "meaning": "Single Root I/O Virtualization - hardware feature allowing a VM to bypass the vSwitch and directly access a physical NIC for near-native performance",
        "translation": "SR-IOV",
        "translationSv": "Hårdvarufunktion som låter en VM direktaccessa ett fysiskt nätverkskort för nära-native-prestanda",
        "category": "cloud"
      },
      {
        "phrase": "Standard ACL",
        "meaning": "Access list filtering based on source IP only. Numbered 1-99 and 1300-1999. Place close to destination",
        "translation": "Standard ACL",
        "translationSv": "Access-lista som filtrerar baserat på käll-IP endast. Numrerad 1-99 och 1300-1999",
        "category": "techniques"
      },
      {
        "phrase": "Star Topology",
        "meaning": "Network topology where all devices connect to a central switch or hub",
        "translation": "Stjärntopologi",
        "translationSv": "Nätverkstopologi där alla enheter ansluts till en central switch eller hub",
        "category": "fundamentals"
      },
      {
        "phrase": "Stateful Firewall",
        "meaning": "Firewall maintaining a session table tracking connection states. Can determine if packets belong to established connections",
        "translation": "Stateful-brandvägg",
        "translationSv": "Brandvägg som upprätthåller en sessionstabell för anslutningstillstånd",
        "category": "techniques"
      },
      {
        "phrase": "Static NAT",
        "meaning": "One-to-one fixed mapping between a private IP and a public IP address",
        "translation": "Statisk NAT",
        "translationSv": "En-till-en fast mappning mellan en privat och en publik IP-adress",
        "category": "techniques"
      },
      {
        "phrase": "STP Port Roles",
        "meaning": "Root Port (best path to root), Designated Port (best path from segment), Blocked/Non-Designated (no traffic)",
        "translation": "STP-portroller",
        "translationSv": "Root Port (bästa väg till rot), Designated Port (bästa väg från segment), Blocked/Non-Designated (ingen trafik)",
        "category": "switching"
      },
      {
        "phrase": "STP Port States",
        "meaning": "Disabled, Blocking (listen for BPDUs), Listening (prepare to forward), Learning (learn MACs), Forwarding (normal operation)",
        "translation": "STP-porttillstånd",
        "translationSv": "Inaktiverad, Blockering, Lyssning, Inlärning, Vidarebefordran",
        "category": "switching"
      },
      {
        "phrase": "Subnet Mask",
        "meaning": "32-bit value used to distinguish network and host portions of an IP address. In binary, 1s = network, 0s = host",
        "translation": "Subnätsmask",
        "translationSv": "32-bitars värde som skiljer nätverks- och värddelarna av en IP-adress",
        "category": "routing"
      },
      {
        "phrase": "SUID Bit",
        "meaning": "Special permission bit allowing a file to execute with the owner's privileges. Set with chmod u+s. Displayed as 's' in owner execute position",
        "translation": "SUID-bit",
        "translationSv": "Speciell rättighetsbit som kör en fil med ägarens privilegier",
        "category": "linux"
      },
      {
        "phrase": "Switch Virtual Interface (SVI)",
        "meaning": "Virtual Layer 3 interface on a multilayer switch used for inter-VLAN routing without an external router",
        "translation": "SVI",
        "translationSv": "Virtuellt L3-gränssnitt på en multilayer-switch för inter-VLAN-routing utan extern router",
        "category": "switching"
      },
      {
        "phrase": "Symmetric Encryption",
        "meaning": "Encryption using the same key for both encryption and decryption. Examples: AES, 3DES. Fast but key distribution is challenging",
        "translation": "Symmetrisk kryptering",
        "translationSv": "Kryptering med samma nyckel för både kryptering och dekryptering",
        "category": "techniques"
      },
      {
        "phrase": "SYN Cookies",
        "meaning": "Defense against SYN flood where the server encodes connection state in the SYN-ACK sequence number, avoiding resource allocation until handshake completes",
        "translation": "SYN Cookies",
        "translationSv": "Försvar mot SYN-flood där servern kodar anslutningstillstånd i SYN-ACK-sekvensnumret",
        "category": "techniques"
      },
      {
        "phrase": "SYN Flood",
        "meaning": "DoS attack sending many TCP SYN requests without completing the three-way handshake, exhausting server resources",
        "translation": "SYN-översvämning",
        "translationSv": "DoS-attack med många TCP SYN-förfrågningar utan att slutföra trevägshandskakningen",
        "category": "threats"
      },
      {
        "phrase": "systemctl",
        "meaning": "Command to control systemd services. Common: start, stop, restart, enable, disable, status, daemon-reload",
        "translation": "systemctl",
        "translationSv": "Kommando för att kontrollera systemd-tjänster",
        "category": "linux"
      },
      {
        "phrase": "TACACS+",
        "meaning": "Cisco proprietary AAA protocol. TCP port 49. Encrypts entire packet payload. Separates authentication and authorization",
        "translation": "TACACS+",
        "translationSv": "Cisco-proprietärt AAA-protokoll. TCP port 49. Krypterar hela paketinnehållet",
        "category": "techniques"
      },
      {
        "phrase": "TCAM",
        "meaning": "Ternary Content-Addressable Memory used for ACLs and routing lookups. Stores three states: 0, 1, or don't-care",
        "translation": "TCAM",
        "translationSv": "Ternary Content-Addressable Memory för ACL- och routinguppslagning. Lagrar tre tillstånd: 0, 1 eller don't-care",
        "category": "switching"
      },
      {
        "phrase": "TCP/IP 4-Layer Stack",
        "meaning": "Practical protocol suite with four layers: Network Access, Internet, Transport, Application",
        "translation": "TCP/IP-stacken",
        "translationSv": "Praktisk protokollsvit med fyra lager: Nätverksaccess, Internet, Transport, Applikation",
        "category": "fundamentals"
      },
      {
        "phrase": "Terraform",
        "meaning": "Infrastructure as Code tool for provisioning and managing network infrastructure across multiple providers declaratively",
        "translation": "Terraform",
        "translationSv": "Infrastructure as Code-verktyg för deklarativ provisionering av nätverksinfrastruktur",
        "category": "automation"
      },
      {
        "phrase": "Three-Legged Firewall",
        "meaning": "Firewall with three interfaces: external (internet), internal (LAN), and DMZ (public services)",
        "translation": "Trebenad brandvägg",
        "translationSv": "Brandvägg med tre gränssnitt: externt (internet), internt (LAN) och DMZ (publika tjänster)",
        "category": "techniques"
      },
      {
        "phrase": "Traffic Policing",
        "meaning": "QoS technique dropping or re-marking excess traffic that exceeds a configured rate. Uses single/two-rate, three-color marker",
        "translation": "Trafikpolis",
        "translationSv": "QoS-teknik som släpper eller omärker överskottstrafik",
        "category": "enterprise"
      },
      {
        "phrase": "Traffic Shaping",
        "meaning": "QoS technique buffering excess traffic to smooth out bursts and ensure compliance with configured rate limits",
        "translation": "Trafikformning",
        "translationSv": "QoS-teknik som buffrar överskottstrafik för att jämna ut trafiktoppar",
        "category": "enterprise"
      },
      {
        "phrase": "Trunk Port",
        "meaning": "Switch port carrying traffic for multiple VLANs using 802.1Q tagging between switches",
        "translation": "Trunkport",
        "translationSv": "Switchport som bär trafik för flera VLAN med 802.1Q-taggning mellan switchar",
        "category": "switching"
      },
      {
        "phrase": "UDLD",
        "meaning": "Unidirectional Link Detection - Cisco protocol that detects and shuts down unidirectional fiber links",
        "translation": "UDLD",
        "translationSv": "Unidirectional Link Detection - Cisco-protokoll som upptäcker och stänger av envägs fiberlänkar",
        "category": "switching"
      },
      {
        "phrase": "umask",
        "meaning": "Default permission mask removing permissions from new files/directories. Default umask 022 gives 755 for directories, 644 for files",
        "translation": "umask",
        "translationSv": "Standardrättighetsmask för nya filer/kataloger",
        "category": "linux"
      },
      {
        "phrase": "Unicast MAC",
        "meaning": "MAC address targeting a single specific device. First byte ends in 0 (even)",
        "translation": "Unicast-MAC",
        "translationSv": "MAC-adress som riktar sig till en enda specifik enhet. Första byten slutar på 0 (jämnt)",
        "category": "fundamentals"
      },
      {
        "phrase": "Usable Host Range",
        "meaning": "Formula: 2^H - 2, where H = number of host bits. Subtract 2 for network address and broadcast address",
        "translation": "Användbart värdintervall",
        "translationSv": "Formel: 2^H - 2, där H = antal värdbitar. Dra av 2 för nätverksadress och broadcastadress",
        "category": "routing"
      },
      {
        "phrase": "Virtual Switch (vSwitch)",
        "meaning": "Software-based switch running on a hypervisor to connect virtual machines to the physical network",
        "translation": "Virtuell switch",
        "translationSv": "Programvarubaserad switch på en hypervisor för att ansluta virtuella maskiner till det fysiska nätverket",
        "category": "cloud"
      },
      {
        "phrase": "VLAN Hopping",
        "meaning": "Attack exploiting DTP or Native VLAN misconfiguration to gain unauthorized access to another VLAN",
        "translation": "VLAN Hopping",
        "translationSv": "Attack som utnyttjar DTP eller felkonfigurerad Native VLAN för att få obehörig åtkomst till ett annat VLAN",
        "category": "switching"
      },
      {
        "phrase": "VLSM",
        "meaning": "Variable Length Subnet Masking - using different subnet mask lengths within the same network for efficient IP address allocation",
        "translation": "VLSM",
        "translationSv": "Variable Length Subnet Masking - användning av olika subnätsmasklängder inom samma nätverk för effektiv IP-adressallokering",
        "category": "routing"
      },
      {
        "phrase": "vPC",
        "meaning": "Virtual Port Channel - Cisco multi-chassis link aggregation allowing a port channel to span two upstream switches",
        "translation": "vPC",
        "translationSv": "Virtual Port Channel - Cisco multi-chassis länkaggregering över två switchar",
        "category": "enterprise"
      },
      {
        "phrase": "VRRP",
        "meaning": "Virtual Router Redundancy Protocol - open standard FHRP for gateway redundancy. Master/backup with virtual IP",
        "translation": "VRRP",
        "translationSv": "Virtual Router Redundancy Protocol - öppen standard FHRP för gateway-redundans",
        "category": "enterprise"
      },
      {
        "phrase": "VTEP",
        "meaning": "VXLAN Tunnel Endpoint - device performing VXLAN encapsulation and decapsulation. Can be a physical switch, software switch, or hypervisor",
        "translation": "VTEP",
        "translationSv": "VXLAN Tunnel Endpoint - enhet som utför VXLAN-inkapsling och avkapsling",
        "category": "cloud"
      },
      {
        "phrase": "VXLAN",
        "meaning": "Virtual Extensible LAN - overlay protocol encapsulating L2 frames in UDP (port 4789). Uses 24-bit VNI (16M segments) and VTEP endpoints",
        "translation": "VXLAN",
        "translationSv": "Virtual Extensible LAN - overlay-protokoll som kapslar in L2-ramar i UDP",
        "category": "cloud"
      },
      {
        "phrase": "Wildcard Mask",
        "meaning": "Inverse subnet mask used in ACLs and OSPF. 0 = must match, 1 = don't care. Example: 0.0.0.255 matches any host",
        "translation": "Wildcard-mask",
        "translationSv": "Invers subnätsmask för ACL:er och OSPF. 0 = måste matcha, 1 = spelar ingen roll",
        "category": "routing"
      },
      {
        "phrase": "WPA3 SAE",
        "meaning": "Simultaneous Authentication of Equals - WPA3 handshake replacing WPA2-PSK. Provides forward secrecy and protects against dictionary attacks",
        "translation": "WPA3 SAE",
        "translationSv": "WPA3-handskakning som ersätter WPA2-PSK. Ger framtida sekretess och skydd mot ordboksattacker",
        "category": "enterprise"
      },
      {
        "phrase": "YANG",
        "meaning": "Yet Another Next Generation - data modeling language for network device configuration and state, used by NETCONF/RESTCONF",
        "translation": "YANG",
        "translationSv": "Yet Another Next Generation - datamodelleringsspråk för nätverksenhetskonfiguration",
        "category": "automation"
      },
      {
        "phrase": "ZTNA",
        "meaning": "Zero Trust Network Access - security model granting access based on identity and context, not network location. Replaces traditional VPN",
        "translation": "ZTNA",
        "translationSv": "Zero Trust Network Access - säkerhetsmodell som ger åtkomst baserat på identitet och kontext, inte nätverksposition",
        "category": "enterprise"
      },
      {
        "phrase": "Network Virtualization",
        "meaning": "Abstraction of physical network resources (switches, routers, cables) into software-based virtual networks that run independently on shared physical infrastructure",
        "translation": "Nätverksvirtualisering",
        "translationSv": "Abstraktion av fysiska nätverksresurser (switchar, routrar, kablar) till mjukvarubaserade virtuella nätverk som körs oberoende på delad fysisk infrastruktur",
        "category": "cloud"
      },
      {
        "phrase": "Ethernet Frame Structure",
        "meaning": "Frame format consisting of Destination MAC, Source MAC, optional 802.1Q Tag, EtherType, and Data payload fields",
        "translation": "Ethernet-ramstruktur",
        "translationSv": "Ramformat som består av Destinations-MAC, Käll-MAC, valfri 802.1Q-tagg, EtherType och datanyttolastfält",
        "category": "fundamentals"
      }
    ]
  }
];

  const comparisonData = [
  {
    "id": "routing_protocols",
    "name": "Routing Protocols Comparison",
    "subject": "Routing",
    "column1": "OSPF",
    "column2": "EIGRP",
    "column3": "BGP",
    "rows": [
      {
        "aspect": "Type",
        "c1": "Link-state IGP",
        "c2": "Advanced distance vector (Cisco proprietary)",
        "c3": "Path vector EGP"
      },
      {
        "aspect": "Algorithm",
        "c1": "Dijkstra SPF",
        "c2": "DUAL (Diffusing Update)",
        "c3": "Best path selection (attributes)"
      },
      {
        "aspect": "Metric",
        "c1": "Cost (bandwidth-based)",
        "c2": "Composite (BW, delay, load, reliability)",
        "c3": "Multiple attributes (AS-Path, MED, etc.)"
      },
      {
        "aspect": "Convergence",
        "c1": "Fast (event-driven flooding)",
        "c2": "Instant (feasible successors)",
        "c3": "Slow (route propagation)"
      },
      {
        "aspect": "Scalability",
        "c1": "Medium (areas help)",
        "c2": "Large (hierarchical)",
        "c3": "Very large (internet-scale)"
      },
      {
        "aspect": "VLSM/CIDR",
        "c1": "Yes",
        "c2": "Yes",
        "c3": "Yes"
      },
      {
        "aspect": "Authentication",
        "c1": "Plain text, MD5, SHA",
        "c2": "MD5, SHA-256",
        "c3": "MD5, SHA, TCP-AO"
      },
      {
        "aspect": "AD Value",
        "c1": "110",
        "c2": "90 (internal) / 170 (external)",
        "c3": "20 (eBGP) / 200 (iBGP)"
      },
      {
        "aspect": "Transport",
        "c1": "IP (proto 89)",
        "c2": "IP (proto 88)",
        "c3": "TCP (port 179)"
      },
      {
        "aspect": "Use Case",
        "c1": "Enterprise campus, data center",
        "c2": "Cisco-only enterprise",
        "c3": "Internet, MPLS, multi-AS"
      }
    ]
  },
  {
    "id": "switching_protocols",
    "name": "STP Variants Comparison",
    "subject": "Switching",
    "column1": "STP (802.1D)",
    "column2": "RSTP (802.1w)",
    "column3": "MSTP (802.1s)",
    "rows": [
      {
        "aspect": "Convergence Time",
        "c1": "30-50 seconds",
        "c2": "6 seconds or less",
        "c3": "6 seconds or less"
      },
      {
        "aspect": "Port States",
        "c1": "5 (Block, Listen, Learn, Forward, Disable)",
        "c2": "3 (Discard, Learn, Forward)",
        "c3": "3 (Discard, Learn, Forward)"
      },
      {
        "aspect": "Port Roles",
        "c1": "Root, Designated, Blocked",
        "c2": "Root, Designated, Alternate, Backup",
        "c3": "Root, Designated, Alternate, Backup"
      },
      {
        "aspect": "VLAN Support",
        "c1": "Single instance (Cisco PVST+ per VLAN)",
        "c2": "Single instance (Rapid-PVST+ per VLAN)",
        "c3": "Multiple VLANs per instance (up to 64)"
      },
      {
        "aspect": "Backward Compatible",
        "c1": "-",
        "c2": "Yes (with STP)",
        "c3": "Yes (with RSTP)"
      },
      {
        "aspect": "Use Case",
        "c1": "Legacy networks",
        "c2": "Modern switched networks",
        "c3": "Large networks with many VLANs"
      }
    ]
  },
  {
    "id": "nat_types",
    "name": "NAT Types Comparison",
    "subject": "IP Services",
    "column1": "Static NAT",
    "column2": "Dynamic NAT",
    "column3": "PAT (Overload)",
    "rows": [
      {
        "aspect": "Mapping",
        "c1": "1:1 fixed",
        "c2": "M:N from pool",
        "c3": "Many:1 with port numbers"
      },
      {
        "aspect": "Public IP Usage",
        "c1": "One IP per private IP",
        "c2": "Pool of public IPs",
        "c3": "Single public IP"
      },
      {
        "aspect": "Extent of Translation",
        "c1": "IP only",
        "c2": "IP only",
        "c3": "IP + Port (Layer 4)"
      },
      {
        "aspect": "Bidirectional?",
        "c1": "Yes",
        "c2": "No (inside-initiated)",
        "c3": "No (inside-initiated)"
      },
      {
        "aspect": "Use Case",
        "c1": "Servers with fixed public IP",
        "c2": "Internal users needing internet",
        "c3": "Home/SOHO networks, large scale"
      },
      {
        "aspect": "Scalability",
        "c1": "Poor (one-to-one)",
        "c2": "Limited by pool size",
        "c3": "Excellent (65k ports per IP)"
      }
    ]
  },
  {
    "id": "fhrp_protocols",
    "name": "FHRP Protocols Comparison",
    "subject": "IP Services",
    "column1": "HSRP (Cisco)",
    "column2": "VRRP (Open Standard)",
    "column3": "GLBP (Cisco)",
    "rows": [
      {
        "aspect": "Active/Standby",
        "c1": "Active/Standby",
        "c2": "Master/Backup",
        "c3": "AVG/AVF (multiple forwarders)"
      },
      {
        "aspect": "Load Balancing",
        "c1": "No",
        "c2": "No",
        "c3": "Yes (round-robin, weighted)"
      },
      {
        "aspect": "Virtual Router IP",
        "c1": "Different from physical IP",
        "c2": "Can match physical IP",
        "c3": "Different from physical IP"
      },
      {
        "aspect": "Preempt",
        "c1": "Enabled by default",
        "c2": "Disabled by default",
        "c3": "Enabled by default"
      },
      {
        "aspect": "Timers",
        "c1": "Hello 3s, Hold 10s",
        "c2": "Advertisement 1s, Master Down 3s",
        "c3": "Hello 3s, Hold 10s"
      },
      {
        "aspect": "Use Case",
        "c1": "Cisco-only gateway redundancy",
        "c2": "Multi-vendor environments",
        "c3": "Load-balanced gateways"
      }
    ]
  },
  {
    "id": "encryption_types",
    "name": "Symmetric vs Asymmetric Encryption",
    "subject": "Security",
    "column1": "Symmetric Encryption",
    "column2": "Asymmetric Encryption",
    "column3": "",
    "rows": [
      {
        "aspect": "Keys",
        "c1": "Single shared key",
        "c2": "Public/private key pair",
        "c3": ""
      },
      {
        "aspect": "Speed",
        "c1": "Fast (100-200x faster)",
        "c2": "Slow (computationally heavy)",
        "c3": ""
      },
      {
        "aspect": "Key Distribution",
        "c1": "Problem (must share securely)",
        "c2": "Easy (public key is published)",
        "c3": ""
      },
      {
        "aspect": "Algorithms",
        "c1": "AES, DES, 3DES, ChaCha20",
        "c2": "RSA, ECC, Diffie-Hellman",
        "c3": ""
      },
      {
        "aspect": "Use Cases",
        "c1": "Bulk data encryption, VPN payloads",
        "c2": "Key exchange, digital signatures, PKI",
        "c3": ""
      },
      {
        "aspect": "Key Length",
        "c1": "128-256 bits (shorter)",
        "c2": "2048-4096 bits (longer)",
        "c3": ""
      }
    ]
  },
  {
    "id": "cable_types",
    "name": "Ethernet Cable Standards",
    "subject": "Media",
    "column1": "Cat5e",
    "column2": "Cat6",
    "column3": "Cat6a",
    "rows": [
      {
        "aspect": "Frequency",
        "c1": "100 MHz",
        "c2": "250 MHz",
        "c3": "500 MHz"
      },
      {
        "aspect": "Max Speed",
        "c1": "1 Gbps",
        "c2": "10 Gbps (55m)",
        "c3": "10 Gbps (100m)"
      },
      {
        "aspect": "Max Length",
        "c1": "100m",
        "c2": "100m (1G) / 55m (10G)",
        "c3": "100m"
      },
      {
        "aspect": "Shielding",
        "c1": "UTP only",
        "c2": "UTP or STP",
        "c3": "UTP or STP"
      },
      {
        "aspect": "Crosstalk",
        "c1": "Basic",
        "c2": "Improved",
        "c3": "Enhanced (alien crosstalk)"
      },
      {
        "aspect": "Use Case",
        "c1": "Home/small office, legacy",
        "c2": "Enterprise, new installs",
        "c3": "Data center, 10G backbone"
      }
    ]
  },
  {
    "id": "virtualization_types",
    "name": "Hypervisor Types",
    "subject": "Virtualization",
    "column1": "Type 1 (Bare-Metal)",
    "column2": "Type 2 (Hosted)",
    "column3": "Container (OS-Level)",
    "rows": [
      {
        "aspect": "Architecture",
        "c1": "Runs directly on hardware",
        "c2": "Runs on host OS",
        "c3": "Shares host OS kernel"
      },
      {
        "aspect": "Examples",
        "c1": "VMware ESXi, Hyper-V, KVM",
        "c2": "VirtualBox, VMware Workstation",
        "c3": "Docker, Podman, LXC"
      },
      {
        "aspect": "Performance",
        "c1": "Near-native",
        "c2": "Slight overhead",
        "c3": "Native performance"
      },
      {
        "aspect": "Isolation",
        "c1": "Strong (separate kernel per VM)",
        "c2": "Strong (separate kernel per VM)",
        "c3": "Moderate (shared kernel)"
      },
      {
        "aspect": "Boot Time",
        "c1": "Minutes (full OS boot)",
        "c2": "Minutes",
        "c3": "Seconds (process start)"
      },
      {
        "aspect": "Resource Overhead",
        "c1": "High (GB RAM per VM)",
        "c2": "High",
        "c3": "Low (MB per container)"
      },
      {
        "aspect": "Use Case",
        "c1": "Servers, data centers",
        "c2": "Desktop virtualization, testing",
        "c3": "Microservices, DevOps"
      }
    ]
  },
  {
    "id": "cloud_services",
    "name": "Cloud Service Models",
    "subject": "Virtualization",
    "column1": "IaaS",
    "column2": "PaaS",
    "column3": "SaaS",
    "rows": [
      {
        "aspect": "What You Get",
        "c1": "Virtualized hardware (VMs, storage, network)",
        "c2": "Runtime platform + middleware",
        "c3": "Ready-to-use software application"
      },
      {
        "aspect": "You Manage",
        "c1": "OS, apps, data, runtime",
        "c2": "Apps and data only",
        "c3": "Nothing (just use it)"
      },
      {
        "aspect": "Provider Manages",
        "c1": "VMs, storage, networking",
        "c2": "OS, runtime, middleware",
        "c3": "Everything (infra + app)"
      },
      {
        "aspect": "Examples",
        "c1": "AWS EC2, Azure VM, GCP Compute",
        "c2": "Azure App Service, Google App Engine",
        "c3": "Office 365, Gmail, Salesforce"
      },
      {
        "aspect": "Flexibility",
        "c1": "Highest",
        "c2": "Medium",
        "c3": "Lowest"
      },
      {
        "aspect": "Use Case",
        "c1": "Lift-and-shift, custom infra",
        "c2": "App development without infra mgmt",
        "c3": "End-user productivity"
      }
    ]
  },
  {
    "id": "ipv4_vs_ipv6",
    "name": "IPv4 vs IPv6",
    "subject": "Addressing",
    "column1": "IPv4",
    "column2": "IPv6",
    "column3": "",
    "rows": [
      {
        "aspect": "Address Length",
        "c1": "32 bits (4.3 billion addresses)",
        "c2": "128 bits (3.4x10^38 addresses)",
        "c3": ""
      },
      {
        "aspect": "Notation",
        "c1": "Dotted-decimal (192.168.1.1)",
        "c2": "Colon-hexadecimal (2001:db8::1)",
        "c3": ""
      },
      {
        "aspect": "Header Size",
        "c1": "20-60 bytes (variable)",
        "c2": "40 bytes (fixed, simpler)",
        "c3": ""
      },
      {
        "aspect": "Broadcast",
        "c1": "Uses broadcast (255.255.255.255)",
        "c2": "No broadcast – uses multicast and anycast",
        "c3": ""
      },
      {
        "aspect": "ARP",
        "c1": "Uses ARP broadcast",
        "c2": "Uses NDP (Neighbor Discovery Protocol)",
        "c3": ""
      },
      {
        "aspect": "Fragment Handling",
        "c1": "Routers can fragment packets",
        "c2": "Only source can fragment",
        "c3": ""
      },
      {
        "aspect": "DHCP",
        "c1": "DHCPv4 (stateful)",
        "c2": "SLAAC (stateless) + DHCPv6",
        "c3": ""
      },
      {
        "aspect": "Security",
        "c1": "IPsec optional",
        "c2": "IPsec built-in (mandatory in spec)",
        "c3": ""
      },
      {
        "aspect": "NAT",
        "c1": "Widely used due to address shortage",
        "c2": "NAT not needed (enough addresses)",
        "c3": ""
      }
    ]
  },
  {
    "id": "wireless_standards",
    "name": "Wi-Fi Standards",
    "subject": "Wireless",
    "column1": "Wi-Fi 5 (802.11ac)",
    "column2": "Wi-Fi 6 (802.11ax)",
    "column3": "Wi-Fi 7 (802.11be)",
    "rows": [
      {
        "aspect": "Frequency",
        "c1": "5 GHz only",
        "c2": "2.4 GHz + 5 GHz",
        "c3": "2.4/5/6 GHz tri-band"
      },
      {
        "aspect": "Max Speed",
        "c1": "~3.5 Gbps",
        "c2": "~9.6 Gbps",
        "c3": "~46 Gbps"
      },
      {
        "aspect": "MIMO",
        "c1": "Downlink MU-MIMO (4x4)",
        "c2": "DL/UL MU-MIMO (8x8)",
        "c3": "Enhanced MU-MIMO (16x16)"
      },
      {
        "aspect": "Modulation",
        "c1": "256-QAM",
        "c2": "1024-QAM",
        "c3": "4096-QAM"
      },
      {
        "aspect": "Channel Width",
        "c1": "20, 40, 80, 160 MHz",
        "c2": "20, 40, 80, 160 MHz",
        "c3": "20, 40, 80, 160, 320 MHz"
      },
      {
        "aspect": "OFDMA",
        "c1": "No",
        "c2": "Yes",
        "c3": "Yes (enhanced)"
      },
      {
        "aspect": "Release",
        "c1": "2014",
        "c2": "2019",
        "c3": "2024"
      }
    ]
  },
  {
    "id": "tcp_vs_udp",
    "name": "TCP vs UDP",
    "subject": "Transport",
    "column1": "TCP",
    "column2": "UDP",
    "column3": "",
    "rows": [
      {
        "aspect": "Connection",
        "c1": "Connection-oriented (3-way handshake)",
        "c2": "Connectionless",
        "c3": ""
      },
      {
        "aspect": "Reliability",
        "c1": "Guaranteed delivery (ACK + retransmit)",
        "c2": "Best-effort, no ACK",
        "c3": ""
      },
      {
        "aspect": "Ordering",
        "c1": "In-order delivery (sequence numbers)",
        "c2": "No ordering guarantees",
        "c3": ""
      },
      {
        "aspect": "Flow Control",
        "c1": "Sliding window (receiver window size)",
        "c2": "None",
        "c3": ""
      },
      {
        "aspect": "Congestion Control",
        "c1": "Slow start, congestion avoidance",
        "c2": "None",
        "c3": ""
      },
      {
        "aspect": "Header Size",
        "c1": "20-60 bytes",
        "c2": "8 bytes",
        "c3": ""
      },
      {
        "aspect": "Port Range",
        "c1": "Same 0-65535",
        "c2": "Same 0-65535",
        "c3": ""
      },
      {
        "aspect": "Applications",
        "c1": "HTTP/HTTPS, FTP, SSH, SMTP, DNS (zone transfer)",
        "c2": "DNS, DHCP, VoIP, streaming, gaming",
        "c3": ""
      }
    ]
  },
  {
    "id": "dns_records",
    "name": "DNS Record Types",
    "subject": "IP Services",
    "column1": "A",
    "column2": "AAAA",
    "column3": "CNAME",
    "rows": [
      {
        "aspect": "Purpose",
        "c1": "IPv4 address mapping",
        "c2": "IPv6 address mapping",
        "c3": "Alias to another name"
      },
      {
        "aspect": "Contents",
        "c1": "32-bit IPv4 address",
        "c2": "128-bit IPv6 address",
        "c3": "Canonical hostname"
      },
      {
        "aspect": "Usage",
        "c1": "www.example.com → 192.0.2.10",
        "c2": "www.example.com → 2001:db8::10",
        "c3": "blog.example.com → www.example.com"
      },
      {
        "aspect": "Extra Types",
        "c1": "PTR (reverse lookup)",
        "c2": "PTR (reverse lookup)",
        "c3": "MX (mail), TXT (SPF/DKIM), NS (nameservers)"
      },
      {
        "aspect": "TTL",
        "c1": "Cached per TTL (e.g. 300-86400s)",
        "c2": "Cached per TTL",
        "c3": "Cached per TTL"
      }
    ]
  },
  {
    "id": "vpn_types",
    "name": "VPN Types",
    "subject": "Security",
    "column1": "Site-to-Site",
    "column2": "Remote Access",
    "column3": "SSL VPN",
    "rows": [
      {
        "aspect": "Model",
        "c1": "Router-to-router over IPsec tunnel",
        "c2": "Client-to-gateway (IPsec client)",
        "c3": "Browser-based TLS connection"
      },
      {
        "aspect": "Traffic",
        "c1": "Entire site networks",
        "c2": "Individual remote user",
        "c3": "Individual remote user (web/app)"
      },
      {
        "aspect": "Client Needed",
        "c1": "No (network devices)",
        "c2": "Yes (AnyConnect, OpenVPN)",
        "c3": "No (any HTTPS browser)"
      },
      {
        "aspect": "Use Case",
        "c1": "Branch office to HQ",
        "c2": "Teleworker to office",
        "c3": "Guest/partner access"
      },
      {
        "aspect": "Authentication",
        "c1": "PSK or certificates",
        "c2": "Username/password + certs",
        "c3": "Username/password + 2FA"
      }
    ]
  },
  {
    "id": "acl_types",
    "name": "ACL Types",
    "subject": "Security",
    "column1": "Standard ACL",
    "column2": "Extended ACL",
    "column3": "Named ACL",
    "rows": [
      {
        "aspect": "Number Range",
        "c1": "1-99, 1300-1999",
        "c2": "100-199, 2000-2699",
        "c3": "Named (any range)"
      },
      {
        "aspect": "Matches On",
        "c1": "Source IP only",
        "c2": "Source + destination + protocol + port",
        "c3": "Same as extended (or standard)"
      },
      {
        "aspect": "Placement",
        "c1": "Closest to destination",
        "c2": "Closest to source",
        "c3": "Closest to source (extended)"
      },
      {
        "aspect": "Use Case",
        "c1": "Filter by source network",
        "c2": "Precise traffic filtering",
        "c3": "Easier to read/maintain"
      }
    ]
  },
  {
    "id": "vlan_types",
    "name": "VLAN Types",
    "subject": "Switching",
    "column1": "Data VLAN",
    "column2": "Voice VLAN",
    "column3": "Management VLAN",
    "rows": [
      {
        "aspect": "Purpose",
        "c1": "User data traffic",
        "c2": "VoIP phones (QoS priority)",
        "c3": "Switch admin access (SSH/Telnet)"
      },
      {
        "aspect": "Default",
        "c1": "VLAN 1 (default)",
        "c2": "Often 100+ (separate)",
        "c3": "VLAN 1 by default (should change)"
      },
      {
        "aspect": "Trunking",
        "c1": "802.1Q tagged",
        "c2": "802.1Q tagged + CoS 5",
        "c3": "Often native/untagged"
      },
      {
        "aspect": "Best Practice",
        "c1": "Separate broadcast domains",
        "c2": "Separate from data for QoS",
        "c3": "Never use VLAN 1"
      }
    ]
  },
  {
    "id": "wireless_security",
    "name": "Wireless Security Standards",
    "subject": "Wireless",
    "column1": "WEP",
    "column2": "WPA2",
    "column3": "WPA3",
    "rows": [
      {
        "aspect": "Encryption",
        "c1": "RC4 (weak, 40/104-bit)",
        "c2": "AES-CCMP (128-bit)",
        "c3": "AES-GCMP (128/256-bit)"
      },
      {
        "aspect": "Authentication",
        "c1": "Shared key (crackable)",
        "c2": "PSK or 802.1X/EAP",
        "c3": "SAE (dragonfly), 802.1X/EAP"
      },
      {
        "aspect": "Vulnerabilities",
        "c1": "Broken (cracked in minutes)",
        "c2": "KRACK (patched)",
        "c3": "Resistant to offline dictionary attacks"
      },
      {
        "aspect": "Releases",
        "c1": "1997",
        "c2": "2004 (802.11i)",
        "c3": "2018 (802.11ax-ready)"
      },
      {
        "aspect": "Recommended?",
        "c1": "Never use",
        "c2": "Yes (still common)",
        "c3": "Yes (newest devices)"
      }
    ]
  },
  {
    "id": "qos_queues",
    "name": "QoS Queuing Mechanisms",
    "subject": "IP Services",
    "column1": "FIFO",
    "column2": "CBWFQ",
    "column3": "LLQ",
    "rows": [
      {
        "aspect": "Concept",
        "c1": "First-in first-out, no classes",
        "c2": "Per-class weighted fair queues",
        "c3": "CBWFQ + strict priority queue"
      },
      {
        "aspect": "Latency Sensitive",
        "c1": "No special treatment",
        "c2": "Weighted, no strict priority",
        "c3": "Strict priority for VoIP/video"
      },
      {
        "aspect": "Configuration",
        "c1": "Default (no config)",
        "c2": "Class maps + policy maps",
        "c3": "Class maps + priority command"
      },
      {
        "aspect": "Use Case",
        "c1": "Best-effort networks",
        "c2": "Mixed traffic classes",
        "c3": "Voice/video + data"
      }
    ]
  },
  {
    "id": "dhcp_options",
    "name": "IP Address Assignment",
    "subject": "IP Services",
    "column1": "Static",
    "column2": "DHCP",
    "column3": "DHCP Reservation",
    "rows": [
      {
        "aspect": "Configuration",
        "c1": "Manual per device",
        "c2": "Automatic from pool",
        "c3": "Automatic, fixed address per MAC"
      },
      {
        "aspect": "Management",
        "c1": "High overhead",
        "c2": "Low overhead",
        "c3": "Low overhead"
      },
      {
        "aspect": "Lease",
        "c1": "None (permanent)",
        "c2": "Renewed periodically",
        "c3": "Renewed, same address returned"
      },
      {
        "aspect": "Use Case",
        "c1": "Servers, network devices",
        "c2": "Clients, BYOD",
        "c3": "Printers, IP phones, servers"
      }
    ]
  },
  {
    "id": "switchport_modes",
    "name": "Switchport Modes",
    "subject": "Switching",
    "column1": "Access",
    "column2": "Trunk",
    "column3": "Dynamic (DTP)",
    "rows": [
      {
        "aspect": "Carries",
        "c1": "Single VLAN (untagged)",
        "c2": "Multiple VLANs (tagged)",
        "c3": "Auto-negotiated by DTP"
      },
      {
        "aspect": "Default",
        "c1": "VLAN 1",
        "c2": "All VLANs",
        "c3": "Depends on negotiation"
      },
      {
        "aspect": "Config",
        "c1": "switchport mode access",
        "c2": "switchport mode trunk",
        "c3": "switchport mode dynamic auto/desirable"
      },
      {
        "aspect": "Security",
        "c1": "Best (isolated)",
        "c2": "Disable DTP, set allowed VLANs",
        "c3": "Vulnerable to VLAN hopping"
      }
    ]
  },
  {
    "id": "cable_connectors",
    "name": "Fiber Connectors & Media",
    "subject": "Media",
    "column1": "SC",
    "column2": "LC",
    "column3": "SFP",
    "rows": [
      {
        "aspect": "Form Factor",
        "c1": "Push-pull square",
        "c2": "Small latch (half SC size)",
        "c3": "Hot-swappable module"
      },
      {
        "aspect": "Typical Use",
        "c1": "Legacy, datacom backbone",
        "c2": "Modern switches, routers",
        "c3": "Switch/router interfaces"
      },
      {
        "aspect": "Standards",
        "c1": "Single/multi-mode",
        "c2": "Single/multi-mode",
        "c3": "SX (multimode), LX (single-mode)"
      },
      {
        "aspect": "Distances",
        "c1": "550m (MM), 10km+ (SM)",
        "c2": "550m (MM), 10km+ (SM)",
        "c3": "SX 550m / LX 10km"
      }
    ]
  },
  {
    "id": "poe_standards",
    "name": "PoE Standards",
    "subject": "Media",
    "column1": "PoE (802.3af)",
    "column2": "PoE+ (802.3at)",
    "column3": "PoE++ (802.3bt)",
    "rows": [
      {
        "aspect": "Max Power per Port",
        "c1": "15.4W",
        "c2": "30W",
        "c3": "60W (bt Type 3) / 100W (Type 4)"
      },
      {
        "aspect": "Voltage",
        "c1": "37-57V DC",
        "c2": "50-57V DC",
        "c3": "50-57V DC"
      },
      {
        "aspect": "Devices",
        "c1": "IP phones, cameras (low)",
        "c2": "PTZ cameras, APs",
        "c3": "High-power APs, LED lighting"
      },
      {
        "aspect": "Pins Used",
        "c1": "Pairs 1-2 / 3-6",
        "c2": "Pairs 1-2 / 3-6",
        "c3": "All four pairs"
      }
    ]
  },
  {
    "id": "dual_stack",
    "name": "IPv6 Transition Mechanisms",
    "subject": "Addressing",
    "column1": "Dual Stack",
    "column2": "Tunneling",
    "column3": "Translation (NAT64)",
    "rows": [
      {
        "aspect": "Concept",
        "c1": "Both IPv4 and IPv6 on every interface",
        "c2": "IPv6 encapsulated in IPv4 (6to4, GRE)",
        "c3": "IPv6 ↔ IPv4 address translation"
      },
      {
        "aspect": "Transparency",
        "c1": "Native, end-to-end",
        "c2": "Overlay, extra overhead",
        "c3": "Middlebox dependency"
      },
      {
        "aspect": "Use Case",
        "c1": "Preferred migration path",
        "c2": "Islands over IPv4 core",
        "c3": "IPv6-only to IPv4-only services"
      }
    ]
  },
  {
    "id": "static_vs_dynamic",
    "name": "Static vs Dynamic Routing",
    "subject": "Routing",
    "column1": "Static Routing",
    "column2": "Dynamic Routing",
    "rows": [
      {
        "aspect": "Configuration",
        "c1": "Manually entered by admin",
        "c2": "Learned automatically via protocol"
      },
      {
        "aspect": "Topology changes",
        "c1": "No update — must be re-entered",
        "c2": "Routes update automatically"
      },
      {
        "aspect": "Overhead",
        "c1": "None (no protocol traffic)",
        "c2": "Updates consume bandwidth + CPU"
      },
      {
        "aspect": "Convergence",
        "c1": "Instant (no calculation)",
        "c2": "Protocol-dependent (seconds)"
      },
      {
        "aspect": "Administrative distance",
        "c1": "1 (directly connected = 0)",
        "c2": "Protocol-specific (EIGRP 90, OSPF 110, RIP 120)"
      },
      {
        "aspect": "Security / control",
        "c1": "Fully admin-controlled",
        "c2": "Needs authentication + filtering (passive interfaces)"
      },
      {
        "aspect": "Use Case",
        "c1": "Small networks, stub links, default routes",
        "c2": "Larger or redundant networks"
      }
    ]
  },
  {
    "id": "distance_vector_vs_link_state",
    "name": "Distance Vector vs Link State",
    "subject": "Routing",
    "column1": "Distance Vector",
    "column2": "Link State",
    "rows": [
      {
        "aspect": "Sends to",
        "c1": "Neighboring routers only",
        "c2": "Flooded to all routers in the area"
      },
      {
        "aspect": "Sends",
        "c1": "Full routing table periodically (or triggered)",
        "c2": "Link-state info (LSA/LSP) on change"
      },
      {
        "aspect": "Topology knowledge",
        "c1": "\"Route by rumor\" — no full map",
        "c2": "Full topology database (SPF tree)"
      },
      {
        "aspect": "Algorithm",
        "c1": "Bellman-Ford",
        "c2": "Dijkstra SPF"
      },
      {
        "aspect": "Loop prevention",
        "c1": "Split horizon, hold-down timers, poison reverse",
        "c2": "SPF on complete topology"
      },
      {
        "aspect": "Convergence",
        "c1": "Slower",
        "c2": "Fast, event-driven"
      },
      {
        "aspect": "Examples",
        "c1": "RIP, EIGRP (advanced DV)",
        "c2": "OSPF, IS-IS"
      }
    ]
  },
  {
    "id": "hub_switch_router",
    "name": "Hub vs Switch vs Router",
    "subject": "Networking Devices",
    "column1": "Hub",
    "column2": "Switch",
    "column3": "Router",
    "rows": [
      {
        "aspect": "OSI layer",
        "c1": "Layer 1 (repeater)",
        "c2": "Layer 2 (MAC)",
        "c3": "Layer 3 (IP)"
      },
      {
        "aspect": "Forwarding decision",
        "c1": "Broadcasts to all ports",
        "c2": "MAC address table",
        "c3": "Routing table / longest prefix match"
      },
      {
        "aspect": "Collision domains",
        "c1": "One shared for all ports",
        "c2": "One per port (full duplex)",
        "c3": "One per interface"
      },
      {
        "aspect": "Broadcast domains",
        "c1": "One (all ports)",
        "c2": "One per VLAN",
        "c3": "One per interface by default"
      },
      {
        "aspect": "Intelligence",
        "c1": "None — electrical signal repeat",
        "c2": "Learns source MACs, filters/forwards",
        "c3": "Connects different networks, best path"
      },
      {
        "aspect": "Inter-VLAN / inter-network",
        "c1": "No",
        "c2": "Needs router or L3 switch (SVI)",
        "c3": "Yes — native"
      }
    ]
  },
  {
    "id": "switch_frame_forwarding",
    "name": "Switch Frame Forwarding Modes",
    "subject": "Switching",
    "column1": "Store-and-Forward",
    "column2": "Cut-Through",
    "column3": "Fragment-Free",
    "rows": [
      {
        "aspect": "When it forwards",
        "c1": "After receiving the entire frame",
        "c2": "After the destination MAC (first 14 bytes)",
        "c3": "After the first 64 bytes"
      },
      {
        "aspect": "Error checking",
        "c1": "Full CRC — corrupt frames dropped",
        "c2": "None (may forward corrupt frames)",
        "c3": "Detects runts (<64 bytes) and drops them"
      },
      {
        "aspect": "Latency",
        "c1": "Highest",
        "c2": "Lowest",
        "c3": "Moderate"
      },
      {
        "aspect": "Cisco default",
        "c1": "Yes — default mode",
        "c2": "Not default (can be configured per port)",
        "c3": "Not default"
      },
      {
        "aspect": "Use Case",
        "c1": "Reliability-critical networks",
        "c2": "Latency-critical (HPC, storage)",
        "c3": "Legacy compromise between the two"
      }
    ]
  },
  {
    "id": "slaac_vs_dhcpv6",
    "name": "SLAAC vs DHCPv6",
    "subject": "Addressing",
    "column1": "SLAAC",
    "column2": "DHCPv6",
    "rows": [
      {
        "aspect": "Assignment",
        "c1": "Host builds its own address from RA prefix + interface ID (EUI-64/random)",
        "c2": "Server assigns (stateful) or provides extra info (stateless)"
      },
      {
        "aspect": "DNS servers",
        "c1": "Not guaranteed (RDNSS option in RA, optional)",
        "c2": "Provided (Option 23)"
      },
      {
        "aspect": "State",
        "c1": "Stateless — no server required",
        "c2": "Stateful (server-managed) or stateless (info only)"
      },
      {
        "aspect": "Duplicate detection",
        "c1": "DAD (Duplicate Address Detection) run by host",
        "c2": "Server-side handling"
      },
      {
        "aspect": "Control for admin",
        "c1": "Less (host-centric)",
        "c2": "More (centralized, logs, assignments)"
      },
      {
        "aspect": "Use Case",
        "c1": "Simple auto-configuration on LANs",
        "c2": "Enterprise address management, ND tracking"
      }
    ]
  },
  {
    "id": "intervlan_routing",
    "name": "Inter-VLAN Routing Options",
    "subject": "Switching",
    "column1": "Router-on-a-Stick",
    "column2": "SVI (Multilayer Switch)",
    "column3": "L3 Switch (Routed Ports)",
    "rows": [
      {
        "aspect": "Device",
        "c1": "Router with subinterfaces",
        "c2": "Multilayer switch, one virtual interface per VLAN",
        "c3": "Multilayer switch, physical ports in L3 mode"
      },
      {
        "aspect": "VLANs per interface",
        "c1": "Subinterface per VLAN on one trunk",
        "c2": "SVI per VLAN",
        "c3": "Each routed port = separate subnet"
      },
      {
        "aspect": "Traffic path",
        "c1": "All VLANs share the trunk to the router (bottleneck)",
        "c2": "Switched/routed in the backplane",
        "c3": "Routed in the backplane (hardware)"
      },
      {
        "aspect": "Performance",
        "c1": "Limited by link speed (e.g. 1 Gb/s shared)",
        "c2": "Fast",
        "c3": "Fastest — hardware routing"
      },
      {
        "aspect": "Use Case",
        "c1": "Small labs, few VLANs, no L3 switch",
        "c2": "Distribution/core with many VLANs",
        "c3": "Core, redundant uplinks, routed links"
      },
      {
        "aspect": "Cost",
        "c1": "Uses existing router",
        "c2": "Requires L3 switch license",
        "c3": "Requires L3 switch license"
      }
    ]
  },
  {
    "id": "cdp_vs_lldp",
    "name": "CDP vs LLDP",
    "subject": "Neighbor Discovery",
    "column1": "CDP",
    "column2": "LLDP",
    "rows": [
      {
        "aspect": "Standard",
        "c1": "Cisco proprietary",
        "c2": "Open standard (IEEE 802.1AB)"
      },
      {
        "aspect": "Enabled by default",
        "c1": "Yes (Cisco devices)",
        "c2": "No — must be enabled (`lldp run`)"
      },
      {
        "aspect": "Destination address",
        "c1": "Multicast 01:00:0C:CC:CC:CC",
        "c2": "Nearest-bridge multicast 01:80:C2:00:00:0E"
      },
      {
        "aspect": "Timers",
        "c1": "60s update, 180s holdtime",
        "c2": "30s update, 120s holdtime"
      },
      {
        "aspect": "Information shared",
        "c1": "Device ID, platform, capabilities, IP address",
        "c2": "Chassis/port ID, system name, capabilities, management address"
      },
      {
        "aspect": "Configuration",
        "c1": "`cdp enable` / `cdp run`",
        "c2": "`lldp run` / `lldp transmit|receive`"
      }
    ]
  },
  {
    "id": "telnet_vs_ssh",
    "name": "Telnet vs SSH",
    "subject": "Management",
    "column1": "Telnet",
    "column2": "SSH",
    "rows": [
      {
        "aspect": "Encryption",
        "c1": "None — plaintext",
        "c2": "Encrypted (strong crypto)"
      },
      {
        "aspect": "Port",
        "c1": "TCP 23",
        "c2": "TCP 22"
      },
      {
        "aspect": "Authentication",
        "c1": "Plaintext password",
        "c2": "Password and/or public key"
      },
      {
        "aspect": "Security",
        "c1": "Vulnerable to sniffing",
        "c2": "Secure — recommended for device management"
      },
      {
        "aspect": "Cisco setup",
        "c1": "Legacy; disabled by default on modern images",
        "c2": "Requires hostname, domain name + RSA keys (`crypto key generate rsa`)"
      },
      {
        "aspect": "Use Case",
        "c1": "Old lab devices, unsupported environments",
        "c2": "Production remote administration"
      }
    ]
  },
  {
    "id": "syslog_vs_snmp",
    "name": "Syslog vs SNMP",
    "subject": "Monitoring",
    "column1": "Syslog",
    "column2": "SNMP",
    "rows": [
      {
        "aspect": "Function",
        "c1": "Logging of events/messages",
        "c2": "Monitoring and managing device state (MIB)"
      },
      {
        "aspect": "Direction",
        "c1": "Device pushes messages to the server",
        "c2": "Manager polls (GET/SET); device pushes TRAPs"
      },
      {
        "aspect": "Transport/ports",
        "c1": "UDP 514",
        "c2": "UDP 161 (162 for traps)"
      },
      {
        "aspect": "Data format",
        "c1": "Plain-text messages with severity 0-7",
        "c2": "Structured OIDs in a MIB tree"
      },
      {
        "aspect": "Best for",
        "c1": "Troubleshooting history, audit trails",
        "c2": "Performance monitoring, alerting, thresholds"
      },
      {
        "aspect": "Cisco configuration",
        "c1": "`logging host <ip>`",
        "c2": "`snmp-server community <str> ro`"
      }
    ]
  },
  {
    "id": "mac_table_vs_arp_table",
    "name": "MAC Table vs ARP Table",
    "subject": "Switching",
    "column1": "MAC Address Table",
    "column2": "ARP Table",
    "rows": [
      {
        "aspect": "Maps",
        "c1": "MAC address ↔ switch port",
        "c2": "IP address ↔ MAC address"
      },
      {
        "aspect": "Built by",
        "c1": "Learning source MACs of received frames",
        "c2": "ARP requests/replies (broadcast for unknown)"
      },
      {
        "aspect": "Used by",
        "c1": "Switch forwarding decisions",
        "c2": "Hosts/routers resolving next-hop L2 address"
      },
      {
        "aspect": "Lifetime",
        "c1": "Age timer (default ~300s, Cisco)",
        "c2": "ARP cache timeout (minutes)"
      },
      {
        "aspect": "Stored on",
        "c1": "Switch hardware tables (CAM)",
        "c2": "Host/router memory cache"
      },
      {
        "aspect": "Show command",
        "c1": "`show mac address-table`",
        "c2": "`show arp` (or `arp -a`)"
      }
    ]
  }
];

  window.appData = { courses: courses, comparisonData: comparisonData };
})();
